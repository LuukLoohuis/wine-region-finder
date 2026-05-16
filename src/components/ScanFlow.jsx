import { useRef, useState } from 'react';
import { analyzeLabelImage, fileToBase64 } from '../lib/claude.js';
import { WINE_REGIONS } from '../data/wineRegions.js';
import { generateId } from '../lib/storage.js';

const EMPTY_BOTTLE = {
  name: '', producer: '', vintage: '', grape: '',
  country: '', region: '', sub_region: '', appellation: '',
  alcohol: '', notes: '',
};

export default function ScanFlow({ apiKey, onComplete, onCancel }) {
  const fileRef = useRef(null);
  const [stage,   setStage]   = useState('pick');   // pick | analyzing | confirm
  const [preview, setPreview] = useState(null);     // data URL for thumbnail
  const [bottle,  setBottle]  = useState({ ...EMPTY_BOTTLE });
  const [error,   setError]   = useState('');

  const handleFile = async (file) => {
    if (!file) return;
    setError('');

    // Show preview thumbnail
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setStage('analyzing');

    try {
      const { base64, mediaType } = await fileToBase64(file);
      const result = await analyzeLabelImage(base64, mediaType, apiKey);

      // Map Claude's region name to a known region id (fuzzy match)
      const regionId = matchRegion(result.region, result.country);

      setBottle({
        name:        result.name        ?? '',
        producer:    result.producer    ?? '',
        vintage:     result.vintage     ?? '',
        grape:       result.grape       ?? '',
        country:     result.country     ?? '',
        region:      regionId,
        regionRaw:   result.region      ?? '',
        sub_region:  result.sub_region  ?? '',
        appellation: result.appellation ?? '',
        alcohol:     result.alcohol     ?? '',
        notes:       result.notes       ?? '',
      });
      setStage('confirm');
    } catch (err) {
      setError(err.message);
      setStage('pick');
    }
  };

  const handleConfirm = () => {
    const newBottle = {
      id:          generateId(),
      addedAt:     new Date().toISOString(),
      thumbnail:   preview,
      ...bottle,
      vintage:     bottle.vintage ? Number(bottle.vintage) : null,
      alcohol:     bottle.alcohol ? Number(bottle.alcohol) : null,
    };
    onComplete(newBottle);
  };

  const Field = ({ label, field, type = 'text', options }) => (
    <div>
      <label className="wine-label block mb-1">{label}</label>
      {options ? (
        <select
          value={bottle[field]}
          onChange={(e) => setBottle((b) => ({ ...b, [field]: e.target.value }))}
          className="wine-input"
        >
          <option value="">— kies regio —</option>
          {options.map((r) => (
            <option key={r.id} value={r.id}>{r.name} ({r.countryName})</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={bottle[field]}
          onChange={(e) => setBottle((b) => ({ ...b, [field]: e.target.value }))}
          className="wine-input"
          placeholder={label}
        />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-wine-deep/80 backdrop-blur-sm z-40 flex items-end sm:items-center justify-center">
      <div className="bg-wine-paper w-full sm:max-w-lg sm:rounded-t-none rounded-t-2xl sm:rounded-sm shadow-2xl max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-wine-deep text-wine-cream px-5 py-3.5 flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-wine-gold/70">
              {stage === 'pick' ? 'Stap 1 — Scan' : stage === 'analyzing' ? 'Stap 2 — Analyseren' : 'Stap 3 — Bevestigen'}
            </div>
            <h2 className="font-display text-lg font-bold leading-tight">
              {stage === 'pick' ? 'Fles scannen' : stage === 'analyzing' ? 'Etiket lezen…' : 'Details bevestigen'}
            </h2>
          </div>
          <button onClick={onCancel} className="text-wine-gold hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="p-5 space-y-5">
          {/* ── PICK ─────────────────────────────────────────────── */}
          {stage === 'pick' && (
            <div className="space-y-4">
              <p className="font-body text-wine-bark text-sm">
                Maak een foto van het wijnflesetiket of upload een bestaande foto.
                Claude analyseert het etiket automatisch.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-sm p-3 text-red-700 text-sm font-mono">
                  ⚠ {error}
                </div>
              )}

              {/* Camera button — triggers camera on mobile */}
              <button
                onClick={() => fileRef.current?.click()}
                className="wine-btn-primary w-full flex items-center justify-center gap-3 py-4 text-base"
              >
                <span className="text-2xl">📷</span>
                Scan fles
              </button>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />

              {/* Upload fallback */}
              <button
                onClick={() => {
                  const inp = document.createElement('input');
                  inp.type = 'file'; inp.accept = 'image/*';
                  inp.onchange = (e) => handleFile(e.target.files?.[0]);
                  inp.click();
                }}
                className="wine-btn-outline w-full flex items-center justify-center gap-2 text-sm"
              >
                <span>📁</span> Foto uploaden (geen camera)
              </button>
            </div>
          )}

          {/* ── ANALYZING ────────────────────────────────────────── */}
          {stage === 'analyzing' && (
            <div className="flex flex-col items-center gap-5 py-6">
              {preview && (
                <img src={preview} alt="Etiket" className="w-32 h-40 object-cover rounded border border-wine-gold/30 shadow-md" />
              )}
              <div className="text-center space-y-2">
                <div className="text-3xl animate-spin" style={{ display: 'inline-block' }}>⚗️</div>
                <p className="font-display text-wine-dark font-semibold">Claude analyseert het etiket…</p>
                <p className="font-mono text-xs text-wine-bark">Druivensoort · Regio · Jaargang</p>
              </div>
            </div>
          )}

          {/* ── CONFIRM ──────────────────────────────────────────── */}
          {stage === 'confirm' && (
            <div className="space-y-4">
              <div className="flex gap-4">
                {preview && (
                  <img src={preview} alt="Etiket" className="w-20 h-28 object-cover rounded border border-wine-gold/30 shadow flex-shrink-0" />
                )}
                <p className="font-body text-sm text-wine-bark italic">
                  Controleer de geëxtraheerde details en pas aan waar nodig. Claude heeft zijn best gedaan! 🍷
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Field label="Wijnnaam" field="name" />
                </div>
                <Field label="Producent / Château" field="producer" />
                <Field label="Jaargang" field="vintage" type="number" />
                <Field label="Druivensoort" field="grape" />
                <Field label="Land" field="country" />
                <div className="col-span-2">
                  <Field label="Regio (koppeling met kaart)" field="region" options={WINE_REGIONS} />
                  {bottle.regionRaw && (
                    <p className="text-[10px] font-mono text-wine-bark/60 mt-1">
                      Claude las: "{bottle.regionRaw}"
                    </p>
                  )}
                </div>
                <Field label="Sub-regio / Appellation" field="sub_region" />
                <Field label="Alcohol %" field="alcohol" type="number" />
                <div className="col-span-2">
                  <label className="wine-label block mb-1">Notities</label>
                  <textarea
                    rows={2}
                    value={bottle.notes}
                    onChange={(e) => setBottle((b) => ({ ...b, notes: e.target.value }))}
                    className="wine-input resize-none"
                    placeholder="Smaaknotities, gelegenheid, etc."
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStage('pick')} className="wine-btn-outline flex-1">
                  ← Opnieuw scannen
                </button>
                <button onClick={handleConfirm} className="wine-btn-primary flex-1">
                  Toevoegen aan kelder 🍾
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Fuzzy-match Claude's region string to a known region id
function matchRegion(regionStr, countryStr) {
  if (!regionStr) return '';
  const norm   = regionStr.toLowerCase();
  const cNorm  = (countryStr ?? '').toLowerCase();

  const scores = WINE_REGIONS.map((r) => {
    let score = 0;
    if (norm.includes(r.name.toLowerCase())) score += 10;
    if (r.name.toLowerCase().includes(norm))  score += 7;
    // Country hint
    if (cNorm.includes('france') || cNorm.includes('frankrijk')) {
      if (r.country === 'FR') score += 2;
    }
    if (cNorm.includes('spain') || cNorm.includes('spanje')) {
      if (r.country === 'ES') score += 2;
    }
    if (cNorm.includes('italy') || cNorm.includes('italië')) {
      if (r.country === 'IT') score += 2;
    }
    if (cNorm.includes('germany') || cNorm.includes('duitsland')) {
      if (r.country === 'DE') score += 2;
    }
    if (cNorm.includes('portugal')) {
      if (r.country === 'PT') score += 2;
    }
    // Sub-region hints
    for (const sub of r.subRegions ?? []) {
      if (norm.includes(sub.toLowerCase())) score += 5;
    }
    return { id: r.id, score };
  });

  const best = scores.sort((a, b) => b.score - a.score)[0];
  return best.score > 0 ? best.id : '';
}
