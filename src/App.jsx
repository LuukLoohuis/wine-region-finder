import { useState, useCallback, useRef } from 'react';
import Map from './components/Map.jsx';
import Sidebar from './components/Sidebar.jsx';
import Scanner from './components/Scanner.jsx';
import BottleModal from './components/BottleModal.jsx';
import RegionPanel from './components/RegionPanel.jsx';
import { useCollection } from './hooks/useCollection.js';
import { useMapRegions } from './hooks/useMapRegions.js';

export default function App() {
  const { collection, addBottle, removeBottle } = useCollection();
  const { selectedRegion, pulsingRegion, regionData, selectRegion, clearRegion, pulseRegion, matchAndSelect } = useMapRegions();

  const mapActionsRef = useRef(null);

  const [scanning, setScanning]               = useState(false);
  const [pendingBottle, setPendingBottle]      = useState(null);
  const [sidebarOpen, setSidebarOpen]          = useState(true);
  const [apiKeyVisible, setApiKeyVisible]      = useState(false);
  const [apiKeyInput, setApiKeyInput]          = useState(localStorage.getItem('terroir_api_key') ?? '');
  const [filter, setFilter]                    = useState({ search: '' });

  const handleScanResult = useCallback((data) => {
    setScanning(false);
    setPendingBottle(data);
  }, []);

  const handleConfirm = useCallback((bottle) => {
    addBottle(bottle);
    setPendingBottle(null);
    if (bottle.italyAppellation) {
      mapActionsRef.current?.flyToItalianAppellation(bottle.italyAppellation);
    } else if (bottle.region) {
      selectRegion(bottle.region);
      pulseRegion(bottle.region);
    }
  }, [addBottle, selectRegion, pulseRegion]);

  const handleSelectBottle = useCallback((bottle) => {
    if (bottle.region) selectRegion(bottle.region);
  }, [selectRegion]);

  const regionBottles = selectedRegion
    ? collection.filter(b => b.region === selectedRegion)
    : [];

  const saveApiKey = () => {
    localStorage.setItem('terroir_api_key', apiKeyInput);
    setApiKeyVisible(false);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#1C0A00',
      position: 'relative',
    }}>

      {/* Full-screen map */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Map
          collection={collection}
          selectedRegion={selectedRegion}
          onRegionSelect={(id) => id ? selectRegion(id) : clearRegion()}
          pulsingRegion={pulsingRegion}
          mapActionsRef={mapActionsRef}
        />
      </div>

      {/* Sidebar overlay */}
      <Sidebar
        collection={collection}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(v => !v)}
        selectedRegion={selectedRegion}
        regionData={regionData}
        onSelectBottle={handleSelectBottle}
        onDeleteBottle={removeBottle}
        onAddToRegion={clearRegion}
        filter={filter}
        onFilterChange={setFilter}
      />

      {/* Top-right controls */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 30,
      }}>
        {/* Scan button */}
        <button
          className="terroir-btn"
          onClick={() => setScanning(true)}
          style={{ gap: '6px' }}
        >
          <span>📷</span>
          <span>Scan fles</span>
        </button>

        {/* Demo: Barolo */}
        <button
          className="terroir-btn-ghost"
          onClick={() => mapActionsRef.current?.flyToItalianAppellation('Barolo')}
          style={{ gap: '6px' }}
          title="Zoom naar Barolo"
        >
          <span>🍷</span>
          <span>Demo: Barolo</span>
        </button>

        {/* Settings button */}
        <button
          className="terroir-btn-ghost"
          onClick={() => setApiKeyVisible(v => !v)}
          style={{ justifyContent: 'center' }}
          title="API-sleutel instellen"
        >
          ⚙
        </button>
      </div>

      {/* API Key input panel */}
      {apiKeyVisible && (
        <div style={{
          position: 'absolute',
          top: '110px',
          right: '16px',
          width: '280px',
          background: 'rgba(28,10,0,0.97)',
          border: '1px solid #5A2800',
          borderRadius: '10px',
          padding: '14px',
          zIndex: 30,
          boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '9px',
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: 'rgba(200,180,154,0.5)',
            marginBottom: '8px',
          }}>Claude API-sleutel</div>
          <input
            className="terroir-input"
            type="password"
            placeholder="sk-ant-…"
            value={apiKeyInput}
            onChange={e => setApiKeyInput(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="terroir-btn-ghost"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={() => setApiKeyVisible(false)}
            >
              Annuleren
            </button>
            <button
              className="terroir-btn"
              style={{ flex: 2, justifyContent: 'center' }}
              onClick={saveApiKey}
            >
              Opslaan
            </button>
          </div>
        </div>
      )}

      {/* Region panel */}
      {selectedRegion && regionData && (
        <RegionPanel
          regionData={regionData}
          bottles={regionBottles}
          onClose={clearRegion}
          onScan={() => setScanning(true)}
        />
      )}

      {/* Scanner modal */}
      {scanning && (
        <Scanner
          onResult={handleScanResult}
          onClose={() => setScanning(false)}
        />
      )}

      {/* Bottle confirmation modal */}
      {pendingBottle && (
        <BottleModal
          scanData={pendingBottle}
          onConfirm={handleConfirm}
          onCancel={() => setPendingBottle(null)}
        />
      )}
    </div>
  );
}
