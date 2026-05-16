import { useState, useCallback } from 'react';
import Map from './components/Map.jsx';
import Scanner from './components/Scanner.jsx';
import Cellar from './components/Cellar.jsx';
import BottleCard from './components/BottleCard.jsx';
import ApiKeyModal from './components/ApiKeyModal.jsx';
import { useCollection } from './hooks/useCollection.js';
import { getRegion } from './data/regions.js';

export default function App() {
  const { collection, addBottle, removeBottle } = useCollection();

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [scanning,       setScanning]       = useState(false);
  const [showApiModal,   setShowApiModal]   = useState(false);
  const [pendingBottle,  setPendingBottle]  = useState(null); // scan result awaiting confirm
  const [pulsingRegion,  setPulsingRegion]  = useState(null);
  const [filter,         setFilter]         = useState({ country: '', region: '', year: '' });

  const handleScanResult = useCallback((data) => {
    setScanning(false);
    setPendingBottle(data);
  }, []);

  const handleConfirm = useCallback((bottle) => {
    addBottle(bottle);
    setPendingBottle(null);
    // Pulse the region and auto-select
    if (bottle.region) {
      setPulsingRegion(bottle.region);
      setSelectedRegion(bottle.region);
      setTimeout(() => setPulsingRegion(null), 2500);
    }
  }, [addBottle]);

  const handleSelectBottle = useCallback((bottle) => {
    setSelectedRegion(bottle.region || null);
  }, []);

  const selectedRegionData = selectedRegion ? getRegion(selectedRegion) : null;
  const regionBottles = selectedRegion ? collection.filter(b => b.region === selectedRegion) : [];

  return (
    <div className="h-screen flex flex-col bg-wine-bg overflow-hidden text-wine-cream">

      {/* ── Top bar ────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-4 py-2.5 bg-wine-card border-b border-wine-border z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl">🍷</span>
          <div>
            <h1 className="font-display font-bold text-base leading-none text-wine-cream">Wijnkelder</h1>
            <p className="font-mono text-[8px] uppercase tracking-widest text-wine-light/40">
              {collection.length} {collection.length === 1 ? 'fles' : 'flessen'} · West-Europa
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setScanning(true)} className="wine-btn">
            <span>📷</span>
            <span className="hidden sm:inline">Scan fles</span>
          </button>
          <button
            onClick={() => setShowApiModal(true)}
            className="wine-btn-ghost px-2.5 py-2 text-base"
            title="API-sleutel instellen"
          >
            ⚙
          </button>
        </div>
      </header>

      {/* ── Main layout ─────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* Sidebar */}
        <Cellar
          collection={collection}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(v => !v)}
          selectedRegion={selectedRegion}
          onSelectBottle={handleSelectBottle}
          onDeleteBottle={removeBottle}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Map */}
        <main className="flex-1 relative min-w-0">
          <Map
            collection={collection}
            selectedRegion={selectedRegion}
            onRegionSelect={setSelectedRegion}
            pulsingRegion={pulsingRegion}
          />

          {/* Region detail overlay */}
          {selectedRegionData && (
            <div className="absolute bottom-14 right-4 w-64 z-10">
              <div className="bg-wine-panel/95 backdrop-blur-sm border border-wine-border rounded-sm shadow-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-wine-border" style={{ background: '#722F3715' }}>
                  <div className="font-mono text-[8px] uppercase tracking-widest text-wine-light/40">
                    {selectedRegionData.country}
                  </div>
                  <h3 className="font-display font-bold text-wine-cream text-base leading-tight">
                    {selectedRegionData.name}
                  </h3>
                  <p className="font-body text-xs text-wine-light/60 italic mt-0.5 line-clamp-2">
                    {selectedRegionData.description}
                  </p>
                </div>

                {/* Sub-regions */}
                {selectedRegionData.subregions?.length > 0 && (
                  <div className="px-4 py-2 border-b border-wine-border">
                    <div className="font-mono text-[8px] uppercase tracking-widest text-wine-light/40 mb-1.5">Sub-regio's</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedRegionData.subregions.map(s => (
                        <span key={s} className="font-mono text-[8px] bg-wine-card border border-wine-border rounded-sm px-1.5 py-0.5 text-wine-light/70">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottles */}
                <div className="px-4 py-3">
                  <div className="font-mono text-[8px] uppercase tracking-widest text-wine-light/40 mb-2">
                    Mijn flessen · {regionBottles.length}
                  </div>
                  {regionBottles.length === 0 ? (
                    <p className="text-xs text-wine-light/30 font-body italic">Nog geen flessen.</p>
                  ) : (
                    <div className="space-y-1.5 max-h-28 overflow-y-auto">
                      {regionBottles.map(b => (
                        <div key={b.id} className="flex items-center gap-2">
                          {b.thumbnail && (
                            <img src={b.thumbnail} alt="" className="w-6 h-8 object-cover rounded-sm border border-wine-border shrink-0" />
                          )}
                          <div className="min-w-0">
                            <div className="font-display text-xs font-semibold text-wine-cream truncate">{b.name || b.producer}</div>
                            {b.vintage && <div className="font-mono text-[9px] text-wine-gold">{b.vintage}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setScanning(true)} className="wine-btn text-xs py-1.5 flex-1 justify-center">
                      + Fles
                    </button>
                    <button onClick={() => setSelectedRegion(null)} className="wine-btn-ghost text-xs py-1.5 px-3">
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Modals ─────────────────────────────────────────────────── */}
      {scanning && (
        <Scanner onResult={handleScanResult} onClose={() => setScanning(false)} />
      )}

      {pendingBottle && (
        <BottleCard
          scanData={pendingBottle}
          onConfirm={handleConfirm}
          onCancel={() => setPendingBottle(null)}
        />
      )}

      {showApiModal && <ApiKeyModal onClose={() => setShowApiModal(false)} />}
    </div>
  );
}
