#!/usr/bin/env node
/**
 * Converts the MAPA Spain wine DO shapefile ZIP → GeoJSON.
 *
 * The MAPA download requires a browser (reCAPTCHA). Download manually:
 *   https://www.mapa.gob.es/es/cartografia-y-sig/ide/descargas/alimentacion/vinos
 *   → "Archivo Shapefile de las Zonas de Calidad Diferenciada: Vinos (7,33 Mb)"
 *
 * Then run:
 *   node scripts/convertSpain.js /path/to/calidaddiferenciada_vinos.zip
 *   node scripts/convertSpain.js   (looks for calidaddiferenciada_vinos.zip in scripts/)
 *
 * Output: public/data/spain-wines.geojson
 */

import {
  mkdirSync, existsSync, statSync, readFileSync, writeFileSync, unlinkSync,
} from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR   = path.join(__dirname, '..', 'public', 'data');
const OUT_FILE  = path.join(OUT_DIR, 'spain-wines.geojson');
const TMP_DIR   = path.join(OUT_DIR, '_spain_shp');

mkdirSync(OUT_DIR, { recursive: true });

// ── Resolve input ZIP ─────────────────────────────────────────────────────────

const arg = process.argv[2];
let zipPath;

if (arg) {
  zipPath = path.resolve(arg);
} else {
  // Default: look next to this script
  zipPath = path.join(__dirname, 'calidaddiferenciada_vinos.zip');
}

if (!existsSync(zipPath)) {
  console.error('❌  ZIP file not found:', zipPath);
  console.error('');
  console.error('  Download from your browser:');
  console.error('  https://www.mapa.gob.es/es/cartografia-y-sig/ide/descargas/alimentacion/vinos');
  console.error('  Then run:');
  console.error('  node scripts/convertSpain.js /path/to/calidaddiferenciada_vinos.zip');
  process.exit(1);
}

const zipSize = statSync(zipPath).size;
if (zipSize < 500_000) {
  // Sanity check — the real file is ~7.3 MB; < 500 KB is likely an HTML error page
  const head = readFileSync(zipPath, { encoding: 'utf8' }).slice(0, 200);
  if (head.includes('<html') || head.includes('<!DOCTYPE')) {
    console.error('❌  The file at the given path looks like an HTML page, not a ZIP.');
    console.error('   The MAPA download requires a real browser (reCAPTCHA).');
    console.error('   Visit the link above and download via your browser.');
    process.exit(1);
  }
}

// ── Verify it's a ZIP (PK magic bytes) ───────────────────────────────────────

const magic = readFileSync(zipPath).slice(0, 2);
if (magic[0] !== 0x50 || magic[1] !== 0x4b) {
  console.error('❌  File does not appear to be a valid ZIP (wrong magic bytes).');
  process.exit(1);
}

// ── Extract ZIP ───────────────────────────────────────────────────────────────

console.log(`\n📦  Extracting ${path.basename(zipPath)} (${(zipSize / 1024 / 1024).toFixed(1)} MB)…`);
try {
  execSync(`rm -rf "${TMP_DIR}"`, { stdio: 'pipe' });
  mkdirSync(TMP_DIR, { recursive: true });
  execSync(`unzip -o "${zipPath}" -d "${TMP_DIR}"`, { stdio: 'pipe' });
} catch (err) {
  console.error('❌  Failed to extract ZIP:', err.message);
  process.exit(1);
}

// ── Find .shp file ────────────────────────────────────────────────────────────

const shpFiles = execSync(`find "${TMP_DIR}" -iname "*.shp"`, { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

if (!shpFiles.length) {
  console.error('❌  No .shp file found inside ZIP. Contents:');
  execSync(`find "${TMP_DIR}" -type f`, { stdio: 'inherit' });
  process.exit(1);
}

const shpFile = shpFiles[0];
console.log(`✓  Found shapefile: ${path.basename(shpFile)}`);

// ── Convert shapefile → GeoJSON ───────────────────────────────────────────────

console.log('🔄  Converting to GeoJSON…');

const { open } = await import('shapefile');

const source = await open(shpFile);
const features = [];

// Show available DBF fields from first feature
let firstFeature = true;

let result;
while (!(result = await source.read()).done) {
  const feat = result.value;

  if (firstFeature) {
    firstFeature = false;
    console.log(`\n   DBF fields available: ${Object.keys(feat.properties ?? {}).join(', ')}`);
    console.log(`   Sample:`, JSON.stringify(feat.properties, null, 2).slice(0, 300));
    console.log('');
  }

  // Normalize properties using the actual MAPA DBF field names:
  //   CAL_DS_NOM  — full designation name, e.g. "D.O.Gran Canaria"
  //   ZON_DS_NOM  — zone/sub-zone name, e.g. "Gran Canaria"
  //   TPR_DS_DES  — type, e.g. "Denominación de Origen" / "Indicación Geográfica Protegida"
  //   FAM_DS_NOM  — always "Vinos" in this dataset
  //   COMUNIDAD   — not present in this shapefile (no autonomous community field)
  const p = feat.properties ?? {};

  features.push({
    ...feat,
    properties: {
      ...p,
      DENOMINACI: p['CAL_DS_NOM'] ?? null,
      NOMBRE:     p['ZON_DS_NOM'] ?? null,
      TIPO:       p['TPR_DS_DES'] ?? null,
      COMUNIDAD:  null,
    },
  });
}

console.log(`✓  ${features.length} features read`);

// ── Write output ──────────────────────────────────────────────────────────────

const geojson = {
  type: 'FeatureCollection',
  crs: {
    type: 'name',
    properties: { name: 'urn:ogc:def:crs:EPSG::4258' }, // ETRS89 (source CRS)
  },
  features,
};

writeFileSync(OUT_FILE, JSON.stringify(geojson));

const outSize = statSync(OUT_FILE).size;
console.log(`\n✅  Saved → public/data/spain-wines.geojson`);
console.log(`   ${(outSize / 1024 / 1024).toFixed(2)} MB · ${features.length} features`);

// ── Cleanup ───────────────────────────────────────────────────────────────────

try { execSync(`rm -rf "${TMP_DIR}"`, { stdio: 'pipe' }); } catch {}
console.log('   Temp files cleaned up.\n');
