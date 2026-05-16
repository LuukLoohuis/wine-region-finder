import { useState } from 'react';
import { REGIONS_GEOJSON } from '../data/regions.js';

// Map Claude's region string to a known region id
function matchRegion(regionStr, country) {
  if (!regionStr) return '';
  const norm = regionStr.toLowerCase();
  const features = REGIONS_GEOJSON.features;
  let best = null, bestScore = 0;
  for (const f of features) {
    const p = f.properties;
    let score = 0;
    if (norm.includes(p.name.toLowerCase()))  score += 10;
    if (p.name.toLowerCase().includes(norm))  score += 6;
    if (country && p.country.toLowerCase().includes(country.toLowerCase().slice(0,3))) score += 2;
    if (score > bestScore) { bestScore = score; best = p.id; }
  }
  return bestScore > 0 ? best : '';
}

const REGIONS = REGIONS_GEOJSON.features.map(f => f.properties);

export default function BottleCard({ scanData, onConfirm, onCancel }) {
  const [bottle, setBottle] = useState(() => ({
    name:        scanData.name        ?? '',
    producer:    scanData.producer    ?? '',
    vintage:     scanData.vintage     ?? '',
    grape:       scanData.grape       ?? '',
    country:     scanData.country     ?? '',
    region:      matchRegion(scanData.region, scanData.country),
    regionRaw:   scanData.region      ?? '',
    sub_region:  scanData.sub_region  ?? '',
    thumbnail:   scanData.thumbnail   ?? null,
    notes:       '',
  }));

  const set = (field) => (e) => setBottle(b => ({ ...b, [field]: e.target.value }));

  const Field = ({ label, field, type = 'text' }) => (
    <div>
      <label className="wine-label">{label}</label>
      <input type={type} value={bottle[field]} onChange={set(field)} className="wine-input" placeholder={label} />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="bg-wine-panel panel-border w-full sm:max-w-lg sm:rounded-sm rounded-t-xl max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-wine-card border-b border-wine-border px-5 py-3 flex items-center justify-between z-10">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-wine-light/50">Bevestig details</div>
            <h2 className="font-display text-lg font-bold text-wine-cream leading-none">Fles toevoegen</h2>
          </div>
          <button onClick={onCancel} className="text-wine-light/40 hover:text-wine-cream text-2xl leading-none">×</button>
        </div>

        <div className="p-5 space-y-4">
          {/* Thumbnail + hint */}
          <div className="flex gap-4 items-start">
            {bottle.thumbnail && (
              <img src={bottle.thumbnail} alt="" className="w-16 h-22 object-cover rounded-sm border border-wine-border flex-shrink-0" style={{ height: '88px' }} />
            )}
            <p className="font-body text-wine-light/60 text-sm italic">
              Controleer de gegevens en pas aan waar nodig vóór opslaan.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><Field label="Wijnnaam" field="name" /></div>
            <Field label="Producent / Château" field="producer" />
            <Field label="Jaargang" field="vintage" type="number" />
            <Field label="Druivensoort" field="grape" />
            <Field label="Land" field="country" />

            {/* Region selector */}
            <div className="col-span-2">
              <label className="wine-label">Regio (kaart koppeling)</label>
              <select value={bottle.region} onChange={set('region')} className="wine-input">
                <option value="">— selecteer regio —</option>
                {REGIONS.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.country})</option>
                ))}
              </select>
              {bottle.regionRaw && !bottle.region && (
                <p className="font-mono text-[9px] text-wine-light/40 mt-1">Claude las: "{bottle.regionRaw}"</p>
              )}
            </div>

            <div className="col-span-2"><Field label="Sub-regio / Appellation" field="sub_region" /></div>

            <div className="col-span-2">
              <label className="wine-label">Persoonlijke notities</label>
              <textarea
                rows={2}
                value={bottle.notes}
                onChange={set('notes')}
                className="wine-input resize-none"
                placeholder="Smaak, gelegenheid, pairing…"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={onCancel} className="wine-btn-ghost flex-1 justify-center py-2">
              Annuleren
            </button>
            <button
              onClick={() => onConfirm(bottle)}
              className="wine-btn flex-1 justify-center py-2"
            >
              🍾 Toevoegen aan kelder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
