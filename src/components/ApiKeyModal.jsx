import { useState } from 'react';

const STORAGE_KEY = 'wine_claude_key';

export function useApiKey() {
  return {
    key: localStorage.getItem(STORAGE_KEY) ?? '',
    save: (k) => localStorage.setItem(STORAGE_KEY, k),
    clear: () => localStorage.removeItem(STORAGE_KEY),
  };
}

export default function ApiKeyModal({ onClose }) {
  const [key, setKey]     = useState(() => localStorage.getItem(STORAGE_KEY) ?? '');
  const [error, setError] = useState('');

  const save = () => {
    const trimmed = key.trim();
    if (trimmed && !trimmed.startsWith('sk-ant-')) {
      setError('Sleutel moet beginnen met sk-ant-');
      return;
    }
    if (trimmed) localStorage.setItem(STORAGE_KEY, trimmed);
    else localStorage.removeItem(STORAGE_KEY);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-wine-panel panel-border w-full max-w-sm rounded-sm shadow-2xl overflow-hidden">

        <div className="px-5 py-4 border-b border-wine-border flex items-center justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-wine-light/40">Instellingen</div>
            <h2 className="font-display text-lg font-bold text-wine-cream leading-none">API-sleutel</h2>
          </div>
          <button onClick={onClose} className="text-wine-light/30 hover:text-wine-cream text-2xl leading-none">×</button>
        </div>

        <div className="p-5 space-y-4">
          <p className="font-body text-sm text-wine-light/60">
            Je sleutel wordt <strong className="text-wine-cream">alleen lokaal opgeslagen</strong> in je browser
            (localStorage) — nooit verstuurd naar een server of opgeslagen in code.
          </p>

          <div>
            <label className="wine-label">Anthropic API-sleutel</label>
            <input
              type="password"
              value={key}
              onChange={e => { setKey(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && save()}
              placeholder="sk-ant-api03-…"
              className="wine-input"
              autoFocus
            />
            {error && <p className="font-mono text-[10px] text-red-400 mt-1">{error}</p>}
          </div>

          <p className="font-mono text-[9px] text-wine-light/30">
            Sleutel ophalen → console.anthropic.com → API Keys
          </p>

          <div className="flex gap-3">
            {key && localStorage.getItem(STORAGE_KEY) && (
              <button
                onClick={() => { localStorage.removeItem(STORAGE_KEY); setKey(''); }}
                className="wine-btn-ghost text-sm px-3 py-2 text-red-400 border-red-900/50 hover:border-red-400"
              >
                Wissen
              </button>
            )}
            <button onClick={save} className="wine-btn flex-1 justify-center py-2">
              Opslaan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
