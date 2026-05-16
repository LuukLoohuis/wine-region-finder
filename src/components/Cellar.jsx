import { useState } from 'react';
import { getRegion, REGIONS_GEOJSON } from '../data/regions.js';

const REGIONS = REGIONS_GEOJSON.features.map(f => f.properties);

function BottleRow({ bottle, active, onClick, onDelete }) {
  const region = getRegion(bottle.region);
  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-2.5 p-2.5 cursor-pointer rounded-sm transition-colors border ${
        active
          ? 'bg-wine-red/20 border-wine-red/50'
          : 'border-transparent hover:bg-wine-card hover:border-wine-border'
      }`}
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-9 h-13 rounded-sm overflow-hidden border border-wine-border bg-wine-card flex items-center justify-center" style={{ height: '52px' }}>
        {bottle.thumbnail
          ? <img src={bottle.thumbnail} alt="" className="w-full h-full object-cover" />
          : <span className="text-base">🍷</span>}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-sm text-wine-cream leading-tight truncate">
          {bottle.name || bottle.producer || 'Onbekende wijn'}
        </div>
        {bottle.vintage && (
          <div className="font-mono text-[10px] text-wine-gold">{bottle.vintage}</div>
        )}
        <div className="font-body text-xs text-wine-light/60 truncate italic">
          {region?.name ?? bottle.regionRaw ?? bottle.country ?? '—'}
        </div>
      </div>

      <button
        onClick={e => { e.stopPropagation(); onDelete(bottle.id); }}
        className="shrink-0 text-wine-light/20 hover:text-red-400 transition-colors text-lg leading-none mt-0.5 px-1"
        title="Verwijderen"
      >
        ×
      </button>
    </div>
  );
}

export default function Cellar({
  collection, open, onToggle, selectedRegion,
  onSelectBottle, onDeleteBottle, filter, onFilterChange,
}) {
  const [showFilter, setShowFilter] = useState(false);

  const countries = [...new Set(collection.map(b => b.country).filter(Boolean))].sort();
  const years     = [...new Set(collection.map(b => b.vintage).filter(Boolean))].sort((a,b) => b-a);

  const displayed = collection.filter(b => {
    if (filter.country && b.country !== filter.country) return false;
    if (filter.region  && b.region  !== filter.region)  return false;
    if (filter.year    && String(b.vintage) !== filter.year) return false;
    if (selectedRegion && b.region !== selectedRegion) return false;
    return true;
  });

  const hasFilter = filter.country || filter.region || filter.year;

  return (
    <aside className={`flex flex-col bg-wine-panel border-r border-wine-border transition-all duration-200 shrink-0 ${
      open ? 'w-64' : 'w-10'
    }`}>

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-wine-border bg-wine-card shrink-0">
        {open && (
          <div className="min-w-0">
            <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-wine-light/40">Kelder</div>
            <h2 className="font-display font-bold text-wine-cream leading-tight truncate">
              {collection.length} {collection.length === 1 ? 'fles' : 'flessen'}
            </h2>
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-wine-light/40 hover:text-wine-cream transition-colors text-sm w-6 text-center shrink-0"
          title={open ? 'Sluiten' : 'Openen'}
        >
          {open ? '◀' : '▶'}
        </button>
      </div>

      {open && (
        <>
          {/* Filter */}
          <div className="px-3 py-2 border-b border-wine-border shrink-0">
            <button
              onClick={() => setShowFilter(v => !v)}
              className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-wine-light/50 hover:text-wine-light transition-colors"
            >
              <span className="text-[8px]">{showFilter ? '▼' : '▶'}</span>
              Filter
              {hasFilter && <span className="ml-1 bg-wine-red text-wine-cream rounded-full px-1.5 text-[7px]">•</span>}
            </button>

            {showFilter && (
              <div className="mt-2 space-y-1.5">
                <select value={filter.country} onChange={e => onFilterChange({ ...filter, country: e.target.value })} className="wine-input text-xs py-1">
                  <option value="">Alle landen</option>
                  {countries.map(c => <option key={c}>{c}</option>)}
                </select>
                <select value={filter.region} onChange={e => onFilterChange({ ...filter, region: e.target.value })} className="wine-input text-xs py-1">
                  <option value="">Alle regio's</option>
                  {REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
                <select value={filter.year} onChange={e => onFilterChange({ ...filter, year: e.target.value })} className="wine-input text-xs py-1">
                  <option value="">Alle jaargangen</option>
                  {years.map(y => <option key={y}>{y}</option>)}
                </select>
                {hasFilter && (
                  <button onClick={() => onFilterChange({ country:'', region:'', year:'' })} className="text-[9px] font-mono text-wine-red hover:underline">
                    ✕ wis filter
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Region badge */}
          {selectedRegion && (
            <div className="px-3 py-1.5 border-b border-wine-border bg-wine-red/10 shrink-0">
              <span className="font-mono text-[9px] text-wine-light/60 uppercase tracking-wider">
                📍 {getRegion(selectedRegion)?.name ?? selectedRegion}
              </span>
            </div>
          )}

          {/* List */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
            {displayed.length === 0 ? (
              <p className="text-center py-8 font-body text-sm italic text-wine-light/30">
                {collection.length === 0 ? 'Kelder leeg.\nScan je eerste fles.' : 'Geen flessen gevonden.'}
              </p>
            ) : (
              displayed.map(b => (
                <BottleRow
                  key={b.id}
                  bottle={b}
                  active={b.region === selectedRegion}
                  onClick={() => onSelectBottle(b)}
                  onDelete={onDeleteBottle}
                />
              ))
            )}
          </div>

          {/* Stats */}
          {collection.length > 0 && (
            <div className="shrink-0 border-t border-wine-border px-3 py-2 bg-wine-card">
              <div className="grid grid-cols-3 text-center gap-1">
                {[
                  { l: 'Landen',  v: new Set(collection.map(b=>b.country).filter(Boolean)).size },
                  { l: "Regio's", v: new Set(collection.map(b=>b.region).filter(Boolean)).size },
                  { l: 'Jaarg.',  v: new Set(collection.map(b=>b.vintage).filter(Boolean)).size },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <div className="font-display font-bold text-wine-cream text-base leading-none">{v}</div>
                    <div className="font-mono text-[7px] text-wine-light/40 uppercase tracking-wider">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </aside>
  );
}
