import { useState, useCallback, useEffect } from 'react';
import WineMap from './components/WineMap.jsx';
import ScanFlow from './components/ScanFlow.jsx';
import CollectionSidebar from './components/CollectionSidebar.jsx';
import ApiKeyModal from './components/ApiKeyModal.jsx';
import { loadCollection, saveCollection, loadApiKey, saveApiKey } from './lib/storage.js';
import { getRegion } from './data/wineRegions.js';

export default function App() {
  const [collection,     setCollection]     = useState(() => loadCollection());
  const [apiKey,         setApiKey]         = useState(() => loadApiKey());
  const [showApiModal,   setShowApiModal]   = useState(() => !loadApiKey());
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [scanning,       setScanning]       = useState(false);
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [pulseRegion,    setPulseRegion]    = useState(null);
  const [filter,         setFilter]         = useState({ country: '', region: '', year: '' });

  // Bottle detail panel
  const [detailBottle, setDetailBottle] = useState(null);

  const addBottle = useCallback((bottle) => {
    setCollection((prev) => {
      const next = [bottle, ...prev];
      saveCollection(next);
      return next;
    });
    // Pulse the region on the map
    if (bottle.region) {
      setPulseRegion(bottle.region);
      setTimeout(() => setPulseRegion(null), 1200);
      setSelectedRegion(bottle.region);
    }
  }, []);

  const deleteBottle = useCallback((id) => {
    setCollection((prev) => {
      const next = prev.filter((b) => b.id !== id);
      saveCollection(next);
      return next;
    });
    if (detailBottle?.id === id) setDetailBottle(null);
  }, [detailBottle]);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    saveApiKey(key);
    setShowApiModal(false);
  };

  const handleSelectBottle = (bottle) => {
    setSelectedRegion(bottle.region || null);
    setDetailBottle(bottle);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-wine-paper">

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <header className="shrink-0 bg-wine-deep text-wine-cream flex items-center justify-between px-4 py-2.5 shadow-lg z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍷</span>
          <div>
            <h1 className="font-display font-bold text-lg leading-none">Wijnkelder</h1>
            <p className="font-mono text-[9px] text-wine-gold/70 uppercase tracking-widest">
              Wine Collection · {collection.length} {collection.length === 1 ? 'fles' : 'flessen'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Scan button */}
          <button
            onClick={() => setScanning(true)}
            className="flex items-center gap-2 bg-wine-gold text-wine-deep font-display font-bold text-sm px-4 py-2 rounded-sm hover:bg-wine-cream transition-colors"
            style={{ boxShadow: '2px 2px 0 rgba(74,21,40,0.3)' }}
          >
            <span className="text-base">📷</span>
            <span className="hidden sm:inline">Scan fles</span>
          </button>

          {/* API key reset */}
          <button
            onClick={() => setShowApiModal(true)}
            className="text-wine-gold/50 hover:text-wine-gold transition-colors text-sm font-mono px-2 py-2"
            title="API-sleutel wijzigen"
          >
            ⚙
          </button>
        </div>
      </header>

      {/* ── Main layout ──────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* Sidebar */}
        <CollectionSidebar
          collection={collection}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
          selectedRegion={selectedRegion}
          onSelectBottle={handleSelectBottle}
          onDeleteBottle={deleteBottle}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Map area */}
        <main className="flex-1 relative min-w-0">
          <WineMap
            collection={collection}
            selectedRegion={selectedRegion}
            onRegionSelect={setSelectedRegion}
            pulseRegion={pulseRegion}
          />

          {/* Region detail panel — appears when a region is selected */}
          {selectedRegion && (() => {
            const region = getRegion(selectedRegion);
            if (!region) return null;
            const bottles = collection.filter((b) => b.region === selectedRegion);
            return (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-72 z-10">
                <div className="bg-wine-paper/95 backdrop-blur-sm retro-border rounded-sm overflow-hidden shadow-xl">
                  {/* Region header */}
                  <div className="px-4 py-3 border-b border-wine-gold/20"
                    style={{ background: region.color + '22' }}>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-wine-bark/70">
                      {region.countryName}
                    </div>
                    <h3 className="font-display font-bold text-wine-deep text-lg leading-tight">
                      {region.name}
                    </h3>
                    <p className="font-body text-xs text-wine-bark italic mt-0.5 line-clamp-2">
                      {region.description}
                    </p>
                  </div>

                  {/* Sub-regions */}
                  {region.subRegions?.length > 0 && (
                    <div className="px-4 py-2 border-b border-wine-gold/10">
                      <div className="wine-label mb-1">Sub-regio's</div>
                      <div className="flex flex-wrap gap-1">
                        {region.subRegions.map((s) => (
                          <span key={s} className="font-mono text-[9px] bg-wine-cream border border-wine-gold/30 rounded-sm px-1.5 py-0.5 text-wine-bark">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* My bottles from this region */}
                  <div className="px-4 py-2.5">
                    <div className="wine-label mb-1.5">
                      Mijn flessen · {bottles.length}
                    </div>
                    {bottles.length === 0 ? (
                      <p className="text-xs text-wine-bark/50 font-body italic">Nog geen flessen uit {region.name}</p>
                    ) : (
                      <div className="space-y-1.5 max-h-36 overflow-y-auto">
                        {bottles.map((b) => (
                          <div key={b.id} className="flex items-center gap-2">
                            {b.thumbnail && (
                              <img src={b.thumbnail} alt="" className="w-6 h-9 object-cover rounded-sm border border-wine-gold/20 shrink-0" />
                            )}
                            <div className="min-w-0">
                              <div className="font-display text-xs font-semibold text-wine-deep truncate">
                                {b.name || b.producer}
                              </div>
                              <div className="font-mono text-[9px] text-wine-gold">{b.vintage}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="px-4 pb-3 flex gap-2">
                    <button
                      onClick={() => setScanning(true)}
                      className="flex-1 wine-btn-primary text-xs py-1.5 text-center"
                    >
                      + Fles toevoegen
                    </button>
                    <button
                      onClick={() => { setSelectedRegion(null); setDetailBottle(null); }}
                      className="wine-btn-outline text-xs py-1.5 px-3"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Legend */}
          <div className="absolute top-14 right-3 z-10 bg-wine-paper/90 backdrop-blur-sm border border-wine-gold/30 rounded-sm px-3 py-2 shadow-sm">
            <div className="wine-label mb-1.5">Kelder dichtheid</div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {['#E8DDD4', '#D4B8B0', '#BC8878', '#9B4A5A', '#722F37'].map((c, i) => (
                  <div key={i} className="w-4 h-3 rounded-sm" style={{ background: c }} />
                ))}
              </div>
              <div className="flex justify-between w-full">
                <span className="font-mono text-[8px] text-wine-bark/60">0</span>
                <span className="font-mono text-[8px] text-wine-bark/60">5+</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Modals / overlays ────────────────────────────────────────── */}
      {showApiModal && <ApiKeyModal onSave={handleSaveApiKey} />}

      {scanning && (
        <ScanFlow
          apiKey={apiKey}
          onComplete={(bottle) => {
            addBottle(bottle);
            setScanning(false);
          }}
          onCancel={() => setScanning(false)}
        />
      )}
    </div>
  );
}
