#!/usr/bin/env node
/**
 * Filters Italy municipalities GeoJSON to only those in ITALY_WINE_ZONES,
 * then simplifies geometry using mapshaper (must be installed globally).
 *
 * Input:  public/data/italy-municipalities.geojson
 * Output: public/data/italy-wine-municipalities.geojson
 *
 * Usage: node scripts/processData.js
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR   = path.join(__dirname, '..', 'public', 'data');
const INPUT      = path.join(DATA_DIR, 'italy-municipalities.geojson');
const OUTPUT     = path.join(DATA_DIR, 'italy-wine-municipalities.geojson');
const TMP_FILTER = path.join(DATA_DIR, '_italy_filtered_tmp.geojson');

// ── Verify input ──────────────────────────────────────────────────────────────

if (!existsSync(INPUT)) {
  console.error(`ERROR: Input file not found: ${INPUT}`);
  console.error('Run "npm run download-data" first to download the municipalities file.');
  process.exit(1);
}

// ── Import wine zones ─────────────────────────────────────────────────────────

const { ITALY_WINE_ZONES } = await import('../src/data/italyWineZones.js');
const wineIstatCodes = new Set(Object.keys(ITALY_WINE_ZONES));
console.log(`Loaded ${wineIstatCodes.size} ISTAT codes from ITALY_WINE_ZONES.`);

// ── Read and filter municipalities ────────────────────────────────────────────

console.log(`Reading ${INPUT}...`);
const raw = JSON.parse(readFileSync(INPUT, 'utf8'));
const totalFeatures = raw.features?.length ?? 0;
console.log(`  Total municipalities in source: ${totalFeatures}`);

// The openpolis GeoJSON uses "com_istat_code" or "pro_com" as the ISTAT field.
// Detect which property name holds the 6-digit code.
const sampleProps = raw.features?.[0]?.properties ?? {};
console.log(`  Sample feature properties: ${Object.keys(sampleProps).join(', ')}`);

function getIstatCode(props) {
  // Try common field names for 6-digit ISTAT municipality code
  const candidates = ['com_istat_code', 'pro_com', 'ISTAT', 'istat', 'COD_COM', 'cod_com', 'PRO_COM'];
  for (const key of candidates) {
    if (props[key] != null) {
      // Ensure 6-digit zero-padded string
      return String(props[key]).padStart(6, '0');
    }
  }
  return null;
}

const filtered = raw.features.filter((feature) => {
  const code = getIstatCode(feature.properties ?? {});
  return code !== null && wineIstatCodes.has(code);
});

console.log(`  Matched municipalities: ${filtered.length} / ${totalFeatures}`);

if (filtered.length === 0) {
  console.error('  No municipalities matched! Check that the ISTAT field name is correct.');
  console.error(`  Available property keys: ${Object.keys(sampleProps).join(', ')}`);
  process.exit(1);
}

// Log matched appellations for verification
const matchedCodes = new Set(filtered.map(f => getIstatCode(f.properties)));
const unmatchedCodes = [...wineIstatCodes].filter(c => !matchedCodes.has(c));
if (unmatchedCodes.length > 0) {
  console.log(`  ISTAT codes in ITALY_WINE_ZONES not found in source data (${unmatchedCodes.length}):`);
  unmatchedCodes.slice(0, 20).forEach(c => {
    console.log(`    ${c}  ->  ${ITALY_WINE_ZONES[c].appellation} (${ITALY_WINE_ZONES[c].region})`);
  });
  if (unmatchedCodes.length > 20) {
    console.log(`    ... and ${unmatchedCodes.length - 20} more`);
  }
}

// Enrich features with wine zone properties
const enrichedFeatures = filtered.map((feature) => {
  const code = getIstatCode(feature.properties ?? {});
  const zone = ITALY_WINE_ZONES[code];
  return {
    ...feature,
    properties: {
      ...feature.properties,
      wine_appellation:    zone.appellation,
      wine_classification: zone.classification,
      wine_region:         zone.region,
      wine_color:          zone.color,
      wine_grapes:         zone.grapes.join(', '),
      wine_description:    zone.description,
    },
  };
});

// Write filtered GeoJSON to temp file
const filteredGeoJSON = { type: 'FeatureCollection', features: enrichedFeatures };
writeFileSync(TMP_FILTER, JSON.stringify(filteredGeoJSON));
console.log(`\nWritten filtered GeoJSON to temp file (${(JSON.stringify(filteredGeoJSON).length / 1024).toFixed(0)} KB).`);

// ── Simplify with mapshaper ───────────────────────────────────────────────────

console.log('\nSimplifying with mapshaper (10%)...');

// Check mapshaper is available
try {
  execSync('mapshaper --version', { stdio: 'pipe' });
} catch {
  console.error('ERROR: mapshaper is not installed or not in PATH.');
  console.error('Install it globally: npm install -g mapshaper');
  // Fall back: just copy the filtered file without simplification
  console.log('Falling back: copying filtered file without simplification.');
  writeFileSync(OUTPUT, JSON.stringify(filteredGeoJSON, null, 2));
  try { unlinkSync(TMP_FILTER); } catch {}
  console.log(`\nOutput (no simplification): ${OUTPUT}`);
  process.exit(0);
}

try {
  execSync(
    `mapshaper "${TMP_FILTER}" -simplify 10% keep-shapes -o format=geojson "${OUTPUT}"`,
    { stdio: 'inherit' }
  );
  console.log(`\nSimplified output saved to: ${OUTPUT}`);
} catch (err) {
  console.error('mapshaper failed:', err.message);
  console.log('Falling back: saving filtered (non-simplified) file.');
  writeFileSync(OUTPUT, JSON.stringify(filteredGeoJSON, null, 2));
} finally {
  try { unlinkSync(TMP_FILTER); } catch {}
}

// ── Final stats ───────────────────────────────────────────────────────────────

if (existsSync(OUTPUT)) {
  const { size } = await import('fs').then(m => m.promises.stat(OUTPUT));
  const outData = JSON.parse(readFileSync(OUTPUT, 'utf8'));
  console.log(`\nDone.`);
  console.log(`  Output file: public/data/italy-wine-municipalities.geojson`);
  console.log(`  Features:    ${outData.features?.length ?? '?'}`);
  console.log(`  File size:   ${(size / 1024).toFixed(0)} KB`);
}
