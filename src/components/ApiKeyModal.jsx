import { useState } from 'react';

export default function ApiKeyModal({ onSave }) {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!key.trim().startsWith('sk-ant-')) {
      setError('Vul een geldige Anthropic API-sleutel in (begint met sk-ant-)');
      return;
    }
    onSave(key.trim());
  };

  return (
    <div className="fixed inset-0 bg-wine-deep/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="wine-card retro-border max-w-md w-full p-6 space-y-5">
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="text-4xl mb-2">🍷</div>
          <h1 className="font-display text-2xl font-bold text-wine-deep">Wijnkelder</h1>
          <p className="font-body text-wine-bark text-sm italic">
            Scan etiketten · Ontdek regio's · Bouw je kelder
          </p>
        </div>

        <hr className="border-wine-gold/30" />

        <div className="space-y-2">
          <label className="wine-label block">Anthropic API-sleutel</label>
          <p className="text-xs text-wine-bark font-body">
            Nodig voor het lezen van wijnflasetiketten via Claude Vision.
            Je sleutel wordt alleen lokaal opgeslagen — nooit verstuurd naar een server.
          </p>
          <input
            type="password"
            placeholder="sk-ant-api03-..."
            value={key}
            onChange={(e) => { setKey(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="wine-input"
            autoFocus
          />
          {error && <p className="text-red-600 text-xs font-mono">{error}</p>}
        </div>

        <button onClick={handleSave} className="wine-btn-primary w-full text-center">
          Kelder openen →
        </button>

        <p className="text-[10px] text-wine-bark/60 text-center font-mono">
          Geen sleutel? → console.anthropic.com
        </p>
      </div>
    </div>
  );
}
