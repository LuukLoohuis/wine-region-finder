import { useRef, useState } from 'react';
import { matchRegion } from '../data/wineRegions.js';

const PROMPT = 'Analyseer dit wijnlabel. Geef ALLEEN geldig JSON terug, geen andere tekst: { "name": string, "producer": string, "vintage": number|null, "grape": string, "country": string, "region": string, "sub_region": string|null, "description": string }';

function getApiKey() {
  return import.meta.env.VITE_CLAUDE_API_KEY || localStorage.getItem('terroir_api_key') || '';
}

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
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data: base64 } },
          { type: 'text', text: PROMPT },
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
  const clean = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

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
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const apiKey = getApiKey();

  const handleFile = async (file) => {
    if (!file) return;
    setError('');

    const reader = new FileReader();
    reader.onload = e => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setBusy(true);
    try {
      const { base64, mediaType } = await toBase64(file);
      const parsed = await callClaude(base64, mediaType, apiKey);
      const dataUrl = await new Promise(resolve => {
        const fr = new FileReader();
        fr.onload = e => resolve(e.target.result);
        fr.readAsDataURL(file);
      });
      onResult({ ...parsed, thumbnail: dataUrl });
    } catch (e) {
      setError(e.message);
      setBusy(false);
      setPreview(null);
    }
  };

  const openFileChooser = (capture = false) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    if (capture) input.capture = 'environment';
    input.onchange = e => handleFile(e.target.files?.[0]);
    input.click();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 flex items-end sm:items-center justify-center">
      <div style={{
        background: 'rgba(28,10,0,0.97)',
        border: '1px solid #5A2800',
        width: '100%',
        maxWidth: '400px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(90,40,0,0.5)',
        }}>
          <div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'rgba(200,180,154,0.5)',
            }}>Flesscan</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              fontWeight: 700,
              color: '#F5EDD8',
              margin: 0,
              lineHeight: 1,
            }}>
              {busy ? 'Analyseren…' : 'Scan fles'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(200,180,154,0.4)',
              fontSize: '24px',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0',
            }}
          >×</button>
        </div>

        <div style={{ padding: '20px' }}>
          {!apiKey && (
            <div style={{
              background: 'rgba(139,30,30,0.2)',
              border: '1px solid rgba(139,30,30,0.5)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: '#f9a8a8',
            }}>
              ⚠ Sla eerst je Claude API-sleutel op via ⚙ instellingen
            </div>
          )}

          {error && (
            <div style={{
              background: 'rgba(139,30,30,0.15)',
              border: '1px solid rgba(139,30,30,0.4)',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: '#f9a8a8',
            }}>
              {error}
            </div>
          )}

          {busy ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              padding: '24px 0',
            }}>
              {preview && (
                <img
                  src={preview}
                  alt=""
                  style={{
                    width: '80px',
                    height: '106px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    border: '1px solid #5A2800',
                  }}
                />
              )}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px', animation: 'pulse 1.5s infinite' }}>🍷</div>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '14px',
                  color: '#C8B49A',
                  margin: 0,
                }}>Claude leest het etiket…</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  color: 'rgba(200,180,154,0.4)',
                  marginTop: '4px',
                }}>Druif · Regio · Jaargang</p>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: 'rgba(200,180,154,0.7)',
                margin: 0,
                lineHeight: 1.5,
              }}>
                Maak een foto van het wijnflesetiket. Claude detecteert naam, jaargang en regio automatisch.
              </p>

              <button
                className="terroir-btn"
                style={{ justifyContent: 'center', padding: '12px' }}
                onClick={() => openFileChooser(true)}
                disabled={!apiKey}
              >
                <span style={{ fontSize: '18px' }}>📷</span>
                <span>Camera</span>
              </button>

              <button
                className="terroir-btn-ghost"
                style={{ justifyContent: 'center' }}
                onClick={() => openFileChooser(false)}
                disabled={!apiKey}
              >
                📁 Foto uploaden
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
