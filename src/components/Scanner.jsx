import { useRef, useState } from 'react';

const SYSTEM = `You are a master sommelier. Analyze this wine label image and return ONLY valid JSON — no markdown, no explanation.
Fields: name (string), producer (string), vintage (integer or null), grape (string or null), country (string or null), region (string or null), sub_region (string or null).
If a field is unknown, return null.`;

async function callClaude(base64, mediaType, apiKey) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 512,
      system: SYSTEM,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text',  text: 'Analyze this wine label.' },
        ],
      }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message ?? `Claude API error ${res.status}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text ?? '';
  const clean = text.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/i,'').trim();

  try { return JSON.parse(clean); }
  catch { throw new Error('Kon JSON niet lezen: ' + text.slice(0, 120)); }
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = e => {
      const [header, b64] = e.target.result.split(',');
      resolve({ base64: b64, mediaType: header.match(/data:([^;]+)/)?.[1] ?? 'image/jpeg' });
    };
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function Scanner({ onResult, onClose }) {
  const fileRef     = useRef(null);
  const [busy, setBusy]     = useState(false);
  const [error, setError]   = useState('');
  const [preview, setPreview] = useState(null);
  const apiKey = localStorage.getItem('wine_claude_key') ?? '';

  const handleFile = async (file) => {
    if (!file) return;
    setError('');

    // Show thumbnail
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setBusy(true);
    try {
      const { base64, mediaType } = await toBase64(file);
      const result = await callClaude(base64, mediaType, apiKey);
      onResult({ ...result, thumbnail: await new Promise(r => { const fr = new FileReader(); fr.onload = e => r(e.target.result); fr.readAsDataURL(file); }) });
    } catch (e) {
      setError(e.message);
      setBusy(false);
      setPreview(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 flex items-end sm:items-center justify-center">
      <div className="bg-wine-panel panel-border w-full sm:max-w-sm sm:rounded-sm rounded-t-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-wine-border">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-wine-light/50">Flesscan</div>
            <h2 className="font-display text-lg font-bold text-wine-cream leading-none">
              {busy ? 'Analyseren…' : 'Scan fles'}
            </h2>
          </div>
          <button onClick={onClose} className="text-wine-light/40 hover:text-wine-cream text-2xl leading-none transition-colors">×</button>
        </div>

        <div className="p-5 space-y-4">
          {!apiKey && (
            <div className="bg-red-900/30 border border-red-700/50 rounded-sm p-3 text-sm text-red-300 font-mono">
              ⚠ Sla eerst je Claude API-sleutel op via ⚙ instellingen
            </div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-700/40 rounded-sm p-3 text-sm text-red-300 font-mono">
              {error}
            </div>
          )}

          {busy ? (
            <div className="flex flex-col items-center gap-4 py-6">
              {preview && (
                <img src={preview} alt="" className="w-24 h-32 object-cover rounded-sm border border-wine-border" />
              )}
              <div className="text-center">
                <div className="text-2xl mb-2 animate-pulse">⚗️</div>
                <p className="font-display text-wine-light text-sm">Claude leest het etiket…</p>
                <p className="font-mono text-[10px] text-wine-light/40 mt-1">Druif · Regio · Jaargang</p>
              </div>
            </div>
          ) : (
            <>
              <p className="font-body text-wine-light/70 text-sm">
                Maak een foto van het wijnflesetiket. Claude detecteert naam, jaargang en regio automatisch.
              </p>

              {/* Camera (mobile) */}
              <button
                onClick={() => fileRef.current?.click()}
                className="wine-btn w-full justify-center py-3 text-base"
                disabled={!apiKey}
              >
                <span className="text-xl">📷</span> Camera
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={e => handleFile(e.target.files?.[0])}
              />

              {/* File upload */}
              <button
                onClick={() => {
                  const i = document.createElement('input');
                  i.type='file'; i.accept='image/*';
                  i.onchange = e => handleFile(e.target.files?.[0]);
                  i.click();
                }}
                className="wine-btn-ghost w-full justify-center"
                disabled={!apiKey}
              >
                📁 Foto uploaden
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
