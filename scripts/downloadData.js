#!/usr/bin/env node
/**
 * Downloads Italy municipalities GeoJSON and France AOC GeoJSON.
 * Usage: node scripts/downloadData.js [--force]
 *
 * Outputs:
 *   public/data/italy-municipalities.geojson
 *   public/data/france-aoc.geojson
 */

import { createWriteStream, mkdirSync, existsSync, statSync, readFileSync, unlinkSync } from 'fs';
import { get as httpsGet } from 'https';
import { get as httpGet } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'data');
mkdirSync(OUT_DIR, { recursive: true });

const FORCE = process.argv.includes('--force');
const MAX_REDIRECTS = 10;

// ── HTTP download with redirect handling ──────────────────────────────────────

function download(url, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > MAX_REDIRECTS) {
      return reject(new Error('Too many redirects'));
    }

    console.log(`  Fetching: ${url.slice(0, 90)}${url.length > 90 ? '…' : ''}`);
    const fn = url.startsWith('https') ? httpsGet : httpGet;

    fn(url, { headers: { 'User-Agent': 'terroir-wine-app/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        const loc = res.headers.location;
        if (!loc) { res.resume(); return reject(new Error('Redirect with no Location header')); }
        console.log(`  -> Redirect to: ${loc.slice(0, 90)}${loc.length > 90 ? '…' : ''}`);
        res.resume();
        return download(loc, dest, redirectCount + 1).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }

      const total = parseInt(res.headers['content-length'] ?? '0', 10);
      let received = 0;
      const file = createWriteStream(dest);

      res.on('data', (chunk) => {
        received += chunk.length;
        if (total > 0) {
          const pct = Math.round((received / total) * 100);
          process.stdout.write(`\r  ${(received / 1024 / 1024).toFixed(1)} / ${(total / 1024 / 1024).toFixed(1)} MB  (${pct}%)`);
        } else {
          process.stdout.write(`\r  ${(received / 1024 / 1024).toFixed(1)} MB downloaded`);
        }
      });

      res.pipe(file);

      file.on('finish', () => {
        process.stdout.write('\n');
        file.close();
        resolve(received);
      });

      file.on('error', (err) => {
        try { unlinkSync(dest); } catch {}
        reject(err);
      });

      res.on('error', reject);
    }).on('error', reject);
  });
}

// ── Check if file is fresh (< 30 days old) ───────────────────────────────────

function isFresh(filePath) {
  if (!existsSync(filePath)) return false;
  const ageDays = (Date.now() - statSync(filePath).mtimeMs) / 86_400_000;
  return ageDays < 30;
}

// ── Detect ZIP by magic bytes ─────────────────────────────────────────────────

function isZipFileSync(filePath) {
  if (!existsSync(filePath)) return false;
  try {
    const buf = readFileSync(filePath, { encoding: null }).slice(0, 2);
    return buf[0] === 0x50 && buf[1] === 0x4B;
  } catch {
    return false;
  }
}

// ── Individual dataset handlers ───────────────────────────────────────────────

async function downloadItalyMunicipalities() {
  const dest = path.join(OUT_DIR, 'italy-municipalities.geojson');
  const url = 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_municipalities.geojson';

  if (!FORCE && isFresh(dest)) {
    const st = statSync(dest);
    let count = '?';
    try { count = JSON.parse(readFileSync(dest, 'utf8')).features?.length; } catch {}
    console.log(`  [SKIP] italy-municipalities.geojson already exists`);
    console.log(`         ${(st.size / 1024 / 1024).toFixed(1)} MB · ${count} features · age < 30 days`);
    console.log(`         Use --force to re-download`);
    return;
  }

  console.log('\nDownloading Italy municipalities GeoJSON...');
  await download(url, dest);

  // Validate
  const st = statSync(dest);
  let count = '?';
  try { count = JSON.parse(readFileSync(dest, 'utf8')).features?.length; } catch {}
  console.log(`  Saved -> public/data/italy-municipalities.geojson`);
  console.log(`  ${(st.size / 1024 / 1024).toFixed(2)} MB · ${count} features`);
}

async function downloadFranceAOC() {
  const dest = path.join(OUT_DIR, 'france-aoc.geojson');
  const url = 'https://www.data.gouv.fr/fr/datasets/r/8b5de270-5e62-4848-8845-872da66a45c4';

  if (!FORCE && isFresh(dest)) {
    const st = statSync(dest);
    let count = '?';
    try { count = JSON.parse(readFileSync(dest, 'utf8')).features?.length; } catch {}
    console.log(`  [SKIP] france-aoc.geojson already exists`);
    console.log(`         ${(st.size / 1024 / 1024).toFixed(1)} MB · ${count} features · age < 30 days`);
    console.log(`         Use --force to re-download`);
    return;
  }

  console.log('\nDownloading France AOC GeoJSON...');
  await download(url, dest);

  // Check for ZIP magic bytes (PK)
  const magic = readFileSync(dest).slice(0, 2);
  if (magic[0] === 0x50 && magic[1] === 0x4B) {
    console.warn(`  [WARN] Downloaded content appears to be a ZIP file (PK magic bytes).`);
    console.warn(`         This URL may now point to a shapefile archive instead of GeoJSON.`);
    console.warn(`         Removing invalid file. Try the downloadINAO.js script instead:`);
    console.warn(`         node scripts/downloadINAO.js`);
    try { unlinkSync(dest); } catch {}
    return;
  }

  // Validate JSON
  try {
    const parsed = JSON.parse(readFileSync(dest, 'utf8'));
    const count = parsed.features?.length ?? '?';
    const st = statSync(dest);
    console.log(`  Saved -> public/data/france-aoc.geojson`);
    console.log(`  ${(st.size / 1024 / 1024).toFixed(2)} MB · ${count} features`);
    if (parsed.features?.[0]?.properties) {
      console.log(`  Properties: ${Object.keys(parsed.features[0].properties).join(', ')}`);
    }
  } catch {
    console.warn(`  [WARN] Could not parse downloaded file as JSON. It may be invalid.`);
    try { unlinkSync(dest); } catch {}
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

(async () => {
  try {
    await downloadItalyMunicipalities();
    await downloadFranceAOC();
    console.log('\nDone.');
  } catch (err) {
    console.error('\nFatal error:', err.message);
    process.exit(1);
  }
})();
