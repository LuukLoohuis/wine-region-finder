#!/usr/bin/env node
/**
 * Downloads the INAO AOC wine region data from data.gouv.fr,
 * converts shapefile ZIP → GeoJSON, saves to public/data/france-aop.geojson
 */

import { createWriteStream, mkdirSync, existsSync, statSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { get as httpsGet } from 'https';
import { get as httpGet } from 'http';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR   = path.join(__dirname, '..', 'public', 'data');
const OUT_FILE  = path.join(OUT_DIR, 'france-aop.geojson');
const TMP_ZIP   = path.join(OUT_DIR, '_inao_tmp.zip');
const TMP_DIR   = path.join(OUT_DIR, '_inao_shp');

// data.gouv.fr INAO candidates — GeoJSON first, then shapefile ZIP
const CANDIDATES = [
  'https://www.data.gouv.fr/fr/datasets/r/8b5de270-5e62-4848-8845-872da66a45c4',
  'https://www.data.gouv.fr/api/1/datasets/r/7e18fe86-da0c-4b80-aac5-190403a2a432', // 1.8MB zip
  'https://www.data.gouv.fr/api/1/datasets/r/e79a7c68-2fe4-4225-a802-8379a8d6426c', // 255MB zip
];

mkdirSync(OUT_DIR, { recursive: true });

// ── HTTP download ─────────────────────────────────────────────────────────────

function download(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`  Trying: ${url.slice(0, 80)}…`);
    const fn = url.startsWith('https') ? httpsGet : httpGet;
    fn(url, { headers: { 'User-Agent': 'terroir-wine-app/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const loc = res.headers.location;
        console.log(`  ↳ → ${loc.slice(0, 80)}`);
        res.resume();
        return download(loc, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }

      const total = parseInt(res.headers['content-length'] ?? '0', 10);
      const contentType = res.headers['content-type'] ?? '';
      let received = 0;
      const file = createWriteStream(dest);
      res.on('data', chunk => {
        received += chunk.length;
        if (total > 0) {
          const pct = Math.round((received / total) * 100);
          process.stdout.write(`\r  ${(received / 1024 / 1024).toFixed(1)}/${(total / 1024 / 1024).toFixed(1)} MB (${pct}%)`);
        }
      });
      res.pipe(file);
      file.on('finish', () => { process.stdout.write('\n'); file.close(); resolve({ contentType, size: received }); });
      file.on('error', reject);
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ── ZIP → GeoJSON conversion ──────────────────────────────────────────────────

async function shpZipToGeoJSON(zipPath) {
  console.log('  Converting shapefile ZIP → GeoJSON…');
  mkdirSync(TMP_DIR, { recursive: true });

  // Extract ZIP
  execSync(`unzip -o "${zipPath}" -d "${TMP_DIR}"`, { stdio: 'pipe' });

  // Find .shp file
  const files = execSync(`find "${TMP_DIR}" -name "*.shp"`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  if (!files.length) throw new Error('No .shp file found in ZIP');

  const shpFile = files[0];
  console.log(`  Found: ${path.basename(shpFile)}`);

  // Use shapefile npm package to convert
  const { open } = await import('shapefile');
  const source = await open(shpFile);

  const features = [];
  let result;
  while (!(result = await source.read()).done) {
    features.push(result.value);
  }

  const geojson = { type: 'FeatureCollection', features };
  writeFileSync(OUT_FILE, JSON.stringify(geojson));

  // Cleanup
  execSync(`rm -rf "${TMP_DIR}" "${zipPath}"`, { stdio: 'pipe' });
  return features.length;
}

// ── Check existing ────────────────────────────────────────────────────────────

if (existsSync(OUT_FILE) && !process.argv.includes('--force')) {
  const st = statSync(OUT_FILE);
  const ageDays = (Date.now() - st.mtimeMs) / 86_400_000;
  if (ageDays < 30) {
    let count = '?';
    try { count = JSON.parse(readFileSync(OUT_FILE, 'utf8')).features?.length; } catch {}
    console.log(`✓ france-aop.geojson exists (${(st.size / 1024 / 1024).toFixed(1)} MB · ${count} features · ${ageDays.toFixed(0)}d old)`);
    console.log('  Use --force to re-download');
    process.exit(0);
  }
}

// ── Download loop ─────────────────────────────────────────────────────────────

console.log('📥 Downloading INAO AOC wine region data…\n');

let success = false;
for (const url of CANDIDATES) {
  try {
    const tmpDest = url.includes('.zip') || url.includes('shp') ? TMP_ZIP : OUT_FILE;
    const { contentType } = await download(url, tmpDest);

    const isZip = contentType.includes('zip') || tmpDest === TMP_ZIP || (existsSync(tmpDest) && readFileSync(tmpDest).slice(0, 2).toString() === 'PK');

    let featureCount;
    if (isZip) {
      featureCount = await shpZipToGeoJSON(TMP_ZIP);
    } else {
      // Validate JSON
      const parsed = JSON.parse(readFileSync(OUT_FILE, 'utf8'));
      featureCount = parsed.features?.length ?? '?';
    }

    const st = statSync(OUT_FILE);
    console.log(`\n✓ Saved → public/data/france-aop.geojson`);
    console.log(`  ${(st.size / 1024 / 1024).toFixed(2)} MB · ${featureCount} features`);
    try {
      const sample = JSON.parse(readFileSync(OUT_FILE, 'utf8')).features?.[0]?.properties;
      if (sample) console.log(`  Properties: ${Object.keys(sample).join(', ')}`);
    } catch {}
    success = true;
    break;
  } catch (err) {
    console.warn(`  ✗ Failed: ${err.message}`);
    if (existsSync(TMP_ZIP)) { try { unlinkSync(TMP_ZIP); } catch {} }
  }
}

if (!success) {
  console.error('\n❌ All sources failed. Place GeoJSON manually at public/data/france-aop.geojson');
  console.error('   https://www.data.gouv.fr/fr/datasets/delimitation-parcellaire-des-aoc-viticoles-de-linao/');
  process.exit(1);
}
