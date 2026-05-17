import { useState } from 'react';
import { REGIONS_GEOJSON, matchRegion } from '../data/wineRegions.js';

const REGIONS = REGIONS_GEOJSON.features.map(f => f.properties);

export default function BottleModal({ scanData, onConfirm, onCancel }) {
  const [bottle, setBottle] = useState(() => ({
    name:       scanData.name        ?? '',
    producer:   scanData.producer    ?? '',
    vintage:    scanData.vintage     ?? '',
    grape:      scanData.grape       ?? '',
    country:    scanData.country     ?? '',
    region:     matchRegion(scanData.region, scanData.country),
    regionRaw:  scanData.region      ?? '',
    sub_region: scanData.sub_region  ?? '',
    description: scanData.description ?? '',
    thumbnail:  scanData.thumbnail   ?? null,
  }));

  const set = field => e => setBottle(b => ({ ...b, [field]: e.target.value }));

  const selectedRegionData = REGIONS.find(r => r.id === bottle.region) ?? null;

  const labelStyle = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontSize: '9px',
    textTransform: 'uppercase',
    letterSpacing: '0.22em',
    color: 'rgba(200,180,154,0.6)',
    marginBottom: '4px',
  };

  const inputStyle = {
    width: '100%',
    background: '#3D1A00',
    border: '1px solid #5A2800',
    color: '#F5EDD8',
    fontFamily: 'Inter, sans-serif',
    fontSize: '13px',
    padding: '8px 10px',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        background: 'rgba(28,10,0,0.97)',
        border: '1px solid #5A2800',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '520px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 16px 60px rgba(0,0,0,0.8)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(90,40,0,0.5)',
          background: 'rgba(45,18,0,0.5)',
          flexShrink: 0,
        }}>
          <div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'rgba(200,180,154,0.5)',
            }}>Bevestig details</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '20px',
              fontWeight: 700,
              color: '#F5EDD8',
              margin: 0,
            }}>Fles toevoegen</h2>
          </div>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(200,180,154,0.4)',
              fontSize: '26px',
              cursor: 'pointer',
              lineHeight: 1,
              padding: 0,
            }}
          >×</button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>

          {/* Thumbnail + hint */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '20px' }}>
            {bottle.thumbnail && (
              <img
                src={bottle.thumbnail}
                alt=""
                style={{
                  width: '56px',
                  height: '76px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  border: '1px solid #5A2800',
                  flexShrink: 0,
                }}
              />
            )}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontStyle: 'italic',
              color: 'rgba(200,180,154,0.6)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              Controleer de gegevens en pas aan waar nodig vóór opslaan.
            </p>
          </div>

          {/* Fields grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

            {/* Name - full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Wijnnaam</label>
              <input style={inputStyle} value={bottle.name} onChange={set('name')} placeholder="Wijnnaam" />
            </div>

            {/* Producer */}
            <div>
              <label style={labelStyle}>Producent / Château</label>
              <input style={inputStyle} value={bottle.producer} onChange={set('producer')} placeholder="Producent" />
            </div>

            {/* Vintage */}
            <div>
              <label style={labelStyle}>Jaargang</label>
              <input style={inputStyle} type="number" value={bottle.vintage} onChange={set('vintage')} placeholder="2019" />
            </div>

            {/* Grape */}
            <div>
              <label style={labelStyle}>Druivensoort</label>
              <input style={inputStyle} value={bottle.grape} onChange={set('grape')} placeholder="Druif" />
            </div>

            {/* Country */}
            <div>
              <label style={labelStyle}>Land</label>
              <input style={inputStyle} value={bottle.country} onChange={set('country')} placeholder="Land" />
            </div>

            {/* Region dropdown - full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Regio (kaart koppeling)</label>
              <select
                style={{ ...inputStyle, cursor: 'pointer' }}
                value={bottle.region}
                onChange={set('region')}
              >
                <option value="">— selecteer regio —</option>
                {REGIONS.map(r => (
                  <option key={r.id} value={r.id}>{r.name} ({r.country})</option>
                ))}
              </select>
              {/* Color swatch for matched region */}
              {selectedRegionData && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: selectedRegionData.color ?? '#8B3A3A',
                    flexShrink: 0,
                  }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    color: '#D4A96A',
                  }}>{selectedRegionData.name}</span>
                </div>
              )}
              {bottle.regionRaw && !bottle.region && (
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '9px',
                  color: 'rgba(200,180,154,0.4)',
                  margin: '4px 0 0',
                }}>Claude las: "{bottle.regionRaw}"</p>
              )}
            </div>

            {/* Sub-region - full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Sub-regio / Appellation</label>
              <input style={inputStyle} value={bottle.sub_region} onChange={set('sub_region')} placeholder="Sub-regio" />
            </div>

            {/* Description - full width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Beschrijving</label>
              <textarea
                style={{ ...inputStyle, resize: 'none', minHeight: '70px', lineHeight: 1.5 }}
                rows={3}
                value={bottle.description}
                onChange={set('description')}
                placeholder="Smaak, gelegenheid, pairing…"
              />
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          padding: '16px 20px',
          borderTop: '1px solid rgba(90,40,0,0.5)',
          background: 'rgba(45,18,0,0.3)',
          flexShrink: 0,
        }}>
          <button
            className="terroir-btn-ghost"
            style={{ flex: 1, justifyContent: 'center', padding: '10px' }}
            onClick={onCancel}
          >
            Annuleren
          </button>
          <button
            className="terroir-btn"
            style={{ flex: 2, justifyContent: 'center', padding: '10px' }}
            onClick={() => onConfirm(bottle)}
          >
            🍾 Toevoegen aan kelder
          </button>
        </div>
      </div>
    </div>
  );
}
