#!/usr/bin/env node
/**
 * Uploads the INAO AOC shapefile to Mapbox as a vector tileset.
 * Mapbox Uploads API accepts ZIP shapefiles and GeoJSON directly.
 *
 * Required in .env.local:
 *   MAPBOX_SECRET_TOKEN — Mapbox secret token (sk.*) with uploads:write scope
 *   MAPBOX_USERNAME     — your Mapbox username (default: luuk-loohuis)
 *
 *   (VITE_MAPBOX_TOKEN is used as fallback if it starts with sk.*)
 *
 * Usage:
 *   node scripts/uploadTileset.js
 *   node scripts/uploadTileset.js --tileset france-wine-aop
 */

import { createReadStream, statSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { createHmac, createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { request as httpsReq } from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────

async function loadEnv() {
  const f = path.join(__dirname, '..', '.env.local');
  if (!existsSync(f)) return;
  for (const line of (await readFile(f, 'utf8')).split('\n')) {
    const [k, ...v] = line.split('=');
    if (k?.trim() && !process.env[k.trim()]) process.env[k.trim()] = v.join('=').trim();
  }
}
await loadEnv();

// Prefer dedicated secret token; fall back to VITE token if it's a sk.* token
const TOKEN    = process.env.MAPBOX_SECRET_TOKEN
              ?? (process.env.VITE_MAPBOX_TOKEN?.startsWith('sk.') ? process.env.VITE_MAPBOX_TOKEN : '');
const USERNAME = process.env.MAPBOX_USERNAME ?? 'luuk-loohuis';

const args        = process.argv.slice(2);
const tilesetId   = args[args.indexOf('--tileset') + 1] ?? 'france-wine-aop';
const TILESET     = `${USERNAME}.${tilesetId}`;
const TILESET_NAME = 'France AOC Wine Regions INAO';

// Prefer the simplified GeoJSON (dissolved + simplified with mapshaper)
const SOURCE_CANDIDATES = [
  path.join(__dirname, '..', 'public', 'data', 'france-aop-simplified.geojson'),
  path.join(__dirname, '..', 'public', 'data', 'france-aop.geojson'),
  path.join(__dirname, '..', 'public', 'data', '_inao_shp', '2026-05-11_delim-parcellaire-aoc-shp.shp'),
];

// ── Find source file ──────────────────────────────────────────────────────────

let SOURCE_FILE = null;
let IS_ZIP = false;

for (const p of SOURCE_CANDIDATES) {
  if (!existsSync(p)) continue;
  const header = readFileSync(p).slice(0, 2).toString('ascii');
  if (header === 'PK') { SOURCE_FILE = p; IS_ZIP = true; break; }
  try {
    const parsed = JSON.parse(readFileSync(p, 'utf8'));
    if (parsed.type === 'FeatureCollection') { SOURCE_FILE = p; break; }
  } catch {}
}

if (!SOURCE_FILE) {
  const shpPath = path.join(__dirname, '..', 'public', 'data', '_inao_shp', '2026-05-11_delim-parcellaire-aoc-shp.shp');
  if (existsSync(shpPath)) {
    console.log('Converting shapefile to GeoJSON for upload…');
    SOURCE_FILE = await convertShpToGeoJSON(shpPath);
  } else {
    console.error('❌ No source file found. Run: npm run setup:download first');
    process.exit(1);
  }
}

// ── Validate ──────────────────────────────────────────────────────────────────

if (!TOKEN || (!TOKEN.startsWith('sk.') && !TOKEN.startsWith('pk.'))) {
  console.error('❌ MAPBOX_SECRET_TOKEN not set in .env.local');
  console.error('   Upload requires a secret token (sk.*) from account.mapbox.com/access-tokens');
  console.error('   Scopes needed: uploads:read, uploads:write, uploads:list');
  process.exit(1);
}

const fileSize = statSync(SOURCE_FILE).size;
const fileType = IS_ZIP ? 'Shapefile ZIP' : 'GeoJSON';
console.log(`📦 Uploading: ${path.basename(SOURCE_FILE)}`);
console.log(`   Type:     ${fileType} (${(fileSize / 1024 / 1024).toFixed(1)} MB)`);
console.log(`   Tileset:  ${TILESET}`);
console.log(`   Username: ${USERNAME}\n`);

// ── HTTP helpers ──────────────────────────────────────────────────────────────

function httpsRequest(method, url, { headers = {}, body = null } = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = httpsReq(
      { method, hostname: u.hostname, path: u.pathname + u.search, headers },
      (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          try { resolve({ status: res.statusCode, body: JSON.parse(data), headers: res.headers }); }
          catch  { resolve({ status: res.statusCode, body: data,           headers: res.headers }); }
        });
      }
    );
    req.on('error', reject);
    if (body) req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

// AWS Signature v4 for S3 PUT
function buildSig4Headers(creds, bucket, s3Key, fileSize) {
  const { accessKeyId, secretAccessKey, sessionToken } = creds;
  const region = 'us-east-1';

  const now = new Date();
  // Format: 20260517T123456Z
  const amzDate = now.toISOString().replace(/\.\d{3}/, '').replace(/[-:]/g, '');
  const dateStr = amzDate.slice(0, 8);

  const host = `${bucket}.s3.amazonaws.com`;
  const path_ = `/${s3Key}`;

  // Sorted canonical headers (lowercase keys)
  const hdrs = {
    'content-length': String(fileSize),
    'host': host,
    'x-amz-content-sha256': 'UNSIGNED-PAYLOAD',
    'x-amz-date': amzDate,
    'x-amz-security-token': sessionToken,
  };
  const sortedKeys = Object.keys(hdrs).sort();
  const canonicalHeaders = sortedKeys.map(k => `${k}:${hdrs[k]}\n`).join('');
  const signedHeaders = sortedKeys.join(';');

  const canonicalRequest = [
    'PUT', path_, '',
    canonicalHeaders, signedHeaders,
    'UNSIGNED-PAYLOAD',
  ].join('\n');

  const credScope = `${dateStr}/${region}/s3/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256', amzDate, credScope,
    createHash('sha256').update(canonicalRequest).digest('hex'),
  ].join('\n');

  const hmac = (key, msg) => createHmac('sha256', key).update(msg).digest();
  const sigKey = hmac(hmac(hmac(hmac('AWS4' + secretAccessKey, dateStr), region), 's3'), 'aws4_request');
  const signature = createHmac('sha256', sigKey).update(stringToSign).digest('hex');

  return {
    ...hdrs,
    'Authorization': `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
  };
}

function s3Upload(creds, filePath) {
  return new Promise((resolve, reject) => {
    const size = statSync(filePath).size;
    const host = `${creds.bucket}.s3.amazonaws.com`;
    const s3Path = `/${creds.key}`;
    const headers = buildSig4Headers(creds, creds.bucket, creds.key, size);

    const req = httpsReq(
      { method: 'PUT', hostname: host, path: s3Path, headers },
      (res) => {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => {
          if (res.statusCode !== 200) {
            process.stdout.write('\n');
            console.error(`S3 response: ${body.slice(0, 500)}`);
          }
          resolve(res.statusCode);
        });
      }
    );
    req.on('error', reject);
    let uploaded = 0;
    const stream = createReadStream(filePath);
    stream.on('data', chunk => {
      uploaded += chunk.length;
      process.stdout.write(`\r  S3 upload: ${(uploaded / 1024 / 1024).toFixed(1)}/${(size / 1024 / 1024).toFixed(1)} MB (${Math.round(uploaded / size * 100)}%)`);
    });
    stream.pipe(req);
    stream.on('error', reject);
  });
}

async function convertShpToGeoJSON(shpPath) {
  const outPath = path.join(__dirname, '..', 'public', 'data', 'france-aop-converted.geojson');
  console.log('Converting shapefile → GeoJSON (minimal properties)…');
  const { open } = await import('shapefile');
  const src = await open(shpPath);
  const features = [];
  let r, i = 0;
  while (!(r = await src.read()).done) {
    const p = r.value.properties;
    features.push({
      type: 'Feature',
      geometry: r.value.geometry,
      properties: { app: p.app, signe: p.signe, denom: p.denom, dt: p.dt, id_app: p.id_app },
    });
    i++;
    if (i % 1000 === 0) process.stdout.write(`\r  ${i} features…`);
  }
  process.stdout.write('\n');
  writeFileSync(outPath, JSON.stringify({ type: 'FeatureCollection', features }));
  console.log(`  Saved: ${(statSync(outPath).size / 1024 / 1024).toFixed(1)} MB · ${features.length} features`);
  return outPath;
}

// ── Step 1: Get S3 credentials ────────────────────────────────────────────────

console.log('1/4 Getting Mapbox S3 staging credentials…');
const credRes = await httpsRequest(
  'POST',
  `https://api.mapbox.com/uploads/v1/${USERNAME}/credentials?access_token=${TOKEN}`,
);

if (credRes.status !== 200) {
  console.error(`❌ Credentials failed (${credRes.status}): ${JSON.stringify(credRes.body)}`);
  if (credRes.status === 401) console.error('   → Use a SECRET token (sk.*), not a public token (pk.*)');
  process.exit(1);
}
const creds = credRes.body; // { bucket, key, url, accessKeyId, secretAccessKey, sessionToken }
console.log(`   ✓ Got S3 credentials (bucket: ${creds.bucket})\n`);

// ── Step 2: Upload to S3 with AWS Signature v4 ────────────────────────────────

console.log('2/4 Uploading to Mapbox S3…');
const s3Status = await s3Upload(creds, SOURCE_FILE);
process.stdout.write('\n');
if (s3Status !== 200) { console.error(`❌ S3 upload failed: ${s3Status}`); process.exit(1); }
console.log('   ✓ Uploaded\n');

// ── Step 3: Start Mapbox processing ───────────────────────────────────────────

console.log('3/4 Starting Mapbox tileset processing…');
const uploadRes = await httpsRequest(
  'POST',
  `https://api.mapbox.com/uploads/v1/${USERNAME}?access_token=${TOKEN}`,
  { headers: { 'Content-Type': 'application/json' },
    body: { url: creds.url, tileset: TILESET, name: TILESET_NAME } },
);

if (uploadRes.status !== 201) {
  console.error(`❌ Upload failed (${uploadRes.status}): ${JSON.stringify(uploadRes.body)}`);
  process.exit(1);
}
const uploadId = uploadRes.body.id;
console.log(`   ✓ Processing started (id: ${uploadId})\n`);

// ── Step 4: Poll ──────────────────────────────────────────────────────────────

console.log('4/4 Waiting for tileset to be ready…');
const t0 = Date.now();
while (true) {
  await new Promise(r => setTimeout(r, 6000));
  const { body } = await httpsRequest('GET',
    `https://api.mapbox.com/uploads/v1/${USERNAME}/${uploadId}?access_token=${TOKEN}`);
  const elapsed = Math.round((Date.now() - t0) / 1000);
  process.stdout.write(`\r   ${body.complete ? '✓ complete' : body.error ? '✗ error' : 'processing'} · ${Math.round((body.progress ?? 0) * 100)}% · ${elapsed}s`);
  if (body.error) { console.error(`\n❌ ${body.error}`); process.exit(1); }
  if (body.complete) { process.stdout.write('\n'); break; }
  if (elapsed > 900) { console.error('\n❌ Timeout'); process.exit(1); }
}

// ── Done ──────────────────────────────────────────────────────────────────────

console.log('\n✅ Tileset live!\n');
console.log(`   mapbox://${TILESET}`);
console.log(`\n   Add to .env.local:`);
console.log(`   MAPBOX_USERNAME=${USERNAME}`);
console.log(`   VITE_APPELLATION_TILESET=${TILESET}`);
console.log(`\n   Layer name in Map.jsx: use source-layer 'france-wine-aop'\n`);

// Update .env.local automatically
const envPath = path.join(__dirname, '..', '.env.local');
let envContent = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
if (!envContent.includes('VITE_APPELLATION_TILESET')) {
  envContent += `\nVITE_APPELLATION_TILESET=${TILESET}\nMAPBOX_USERNAME=${USERNAME}\n`;
  writeFileSync(envPath, envContent);
  console.log('   ✓ Updated .env.local automatically');
}
