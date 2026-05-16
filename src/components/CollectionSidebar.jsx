import { useState } from 'react';
import { getRegion, WINE_REGIONS } from '../data/wineRegions.js';

function BottleCard({ bottle, isSelected, onClick, onDelete }) {
  const region = getRegion(bottle.region);

  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-2.5 p-2.5 rounded-sm cursor-pointer transition-colors border ${
        isSelected
          ? 'bg-wine-blush/60 border-wine-dark'
          : 'bg-wine-paper hover:bg-wine-cream border-transparent hover:border-wine-gold/30'
      }`}
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-10 h-14 rounded-sm overflow-hidden bg-wine-cream border border-wine-gold/20 flex items-center justify-center">
        {bottle.thumbnail ? (
          <img src={bottle.thumbnail} alt={bottle.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xl">🍷</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-display font-semibold text-sm text-wine-deep leading-tight truncate">
          {bottle.name || bottle.producer || 'Onbekende wijn'}
        </div>
        {bottle.vintage && (
          <div className="font-mono text-[10px] text-wine-gold font-bold">{bottle.vintage}</div>
        )}
        <div className="font-body text-xs text-wine-bark truncate italic">
          {region ? region.name : bottle.regionRaw || bottle.country || '—'}
        </div>
        {bottle.grape && (
          <div className="font-mono text-[9px] text-wine-bark/60 truncate">{bottle.grape}</div>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(bottle.id); }}
        className="shrink-0 text-wine-bark/30 hover:text-red-400 transition-colors text-lg leading-none mt-0.5"
        title="Verwijderen"
      >
        ×
      </button>
    </div>
  );
}

export default function CollectionSidebar({
  collection, open, onToggle, selectedRegion,
  onSelectBottle, onDeleteBottle, filter, onFilterChange,
}) {
  const [showFilter, setShowFilter] = useState(false);

  const countries = [...new Set(collection.map((b) => b.country).filter(Boolean))].sort();
  const years     = [...new Set(collection.map((b) => b.vintage).filter(Boolean))].sort((a, b) => b - a);

  const filtered = collection.filter((b) => {
    if (filter.country && b.country !== filter.country) return false;
    if (filter.region  && b.region  !== filter.region)  return false;
    if (filter.year    && String(b.vintage) !== filter.year) return false;
    return true;
  });

  // Group by region for display when a region is selected
  const displayed = selectedRegion
    ? filtered.filter((b) => b.region === selectedRegion)
    : filtered;

  return (
    <aside className={`flex flex-col bg-wine-cream border-r border-wine-gold/30 transition-all duration-300 ${
      open ? 'w-64 sm:w-72' : 'w-10'
    }`}>
      {/* Toggle + header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-wine-gold/20 bg-wine-dark text-wine-cream shrink-0">
        {open && (
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-wine-gold/70">
              Kelder
            </div>
            <h2 className="font-display font-bold text-base leading-tight">
              {collection.length} {collection.length === 1 ? 'fles' : 'flessen'}
            </h2>
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-wine-gold hover:text-white transition-colors text-lg w-6 text-center"
          title={open ? 'Zijpaneel sluiten' : 'Zijpaneel openen'}
        >
          {open ? '◀' : '▶'}
        </button>
      </div>

      {open && (
        <>
          {/* Filter toggle */}
          <div className="px-3 pt-2.5 pb-1.5 border-b border-wine-gold/15 shrink-0">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="wine-label flex items-center gap-1 hover:text-wine-dark transition-colors"
            >
              <span>{showFilter ? '▼' : '▶'}</span> Filter
              {(filter.country || filter.region || filter.year) && (
                <span className="ml-1 bg-wine-dark text-white text-[8px] rounded-full px-1.5 py-px">actief</span>
              )}
            </button>
            {showFilter && (
              <div className="mt-2 space-y-2">
                <select
                  value={filter.country}
                  onChange={(e) => onFilterChange({ ...filter, country: e.target.value })}
                  className="wine-input text-xs py-1"
                >
                  <option value="">Alle landen</option>
                  {countries.map((c) => <option key={c}>{c}</option>)}
                </select>
                <select
                  value={filter.region}
                  onChange={(e) => onFilterChange({ ...filter, region: e.target.value })}
                  className="wine-input text-xs py-1"
                >
                  <option value="">Alle regio's</option>
                  {WINE_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <select
                  value={filter.year}
                  onChange={(e) => onFilterChange({ ...filter, year: e.target.value })}
                  className="wine-input text-xs py-1"
                >
                  <option value="">Alle jaargangen</option>
                  {years.map((y) => <option key={y}>{y}</option>)}
                </select>
                {(filter.country || filter.region || filter.year) && (
                  <button
                    onClick={() => onFilterChange({ country: '', region: '', year: '' })}
                    className="text-[10px] font-mono text-wine-dark hover:underline"
                  >
                    ✕ Filter wissen
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Region filter indicator */}
          {selectedRegion && (
            <div className="px-3 py-1.5 bg-wine-blush/50 border-b border-wine-gold/20 shrink-0">
              <span className="font-mono text-[9px] text-wine-dark uppercase tracking-wider">
                📍 {getRegion(selectedRegion)?.name ?? selectedRegion}
              </span>
            </div>
          )}

          {/* Bottle list */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1.5">
            {displayed.length === 0 ? (
              <div className="text-center py-8 text-wine-bark/50 text-sm font-body italic">
                {collection.length === 0
                  ? 'Kelder is leeg.\nScan je eerste fles!'
                  : 'Geen flessen gevonden.'}
              </div>
            ) : (
              displayed.map((bottle) => (
                <BottleCard
                  key={bottle.id}
                  bottle={bottle}
                  isSelected={bottle.region === selectedRegion}
                  onClick={() => onSelectBottle(bottle)}
                  onDelete={onDeleteBottle}
                />
              ))
            )}
          </div>

          {/* Stats footer */}
          {collection.length > 0 && (
            <div className="shrink-0 border-t border-wine-gold/20 px-3 py-2 bg-wine-deep/5">
              <div className="grid grid-cols-3 text-center gap-1">
                {[
                  { label: 'Landen', value: new Set(collection.map((b) => b.country).filter(Boolean)).size },
                  { label: "Regio's", value: new Set(collection.map((b) => b.region).filter(Boolean)).size },
                  { label: 'Jaarg.', value: new Set(collection.map((b) => b.vintage).filter(Boolean)).size },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="font-display font-bold text-wine-dark text-base leading-none">{value}</div>
                    <div className="font-mono text-[8px] text-wine-bark/60 uppercase tracking-wider">{label}</div>
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
