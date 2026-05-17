import { useState } from 'react';

export default function Sidebar({
  collection,
  open,
  onToggle,
  selectedRegion,
  regionData,
  onSelectBottle,
  onDeleteBottle,
  onAddToRegion,
  filter,
  onFilterChange,
}) {
  const [hoveredBottle, setHoveredBottle] = useState(null);

  const totalBottles = collection.length;
  const regionCount = new Set(collection.map(b => b.region).filter(Boolean)).size;
  const countryCount = new Set(collection.map(b => b.country).filter(Boolean)).size;

  const searchTerm = filter?.search ?? '';

  const regionBottles = selectedRegion
    ? collection.filter(b => b.region === selectedRegion)
    : [];

  const filteredCollection = searchTerm
    ? collection.filter(b =>
        [b.name, b.producer, b.region, b.country, b.grape].some(
          v => v && v.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : collection;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        style={{
          position: 'fixed',
          top: '16px',
          left: open ? '328px' : '12px',
          zIndex: 50,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(45,18,0,0.95)',
          border: '1px solid #5A2800',
          color: '#C8B49A',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          transition: 'left 0.2s ease, border-color 0.15s',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#D4A96A'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#5A2800'}
        title={open ? 'Sluit zijbalk' : 'Open zijbalk'}
      >
        {open ? '←' : '☰'}
      </button>

      {/* Sidebar panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '320px',
          height: '100vh',
          background: 'rgba(28,10,0,0.92)',
          backdropFilter: 'blur(12px)',
          borderRight: '1px solid rgba(90,40,0,0.6)',
          zIndex: 40,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.2s ease',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 16px 12px',
          borderBottom: '1px solid rgba(90,40,0,0.5)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span style={{ fontSize: '22px' }}>🍷</span>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '20px',
                fontWeight: 700,
                color: '#F5EDD8',
                margin: 0,
                lineHeight: 1,
              }}>Terroir</h1>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(200,180,154,0.5)',
                margin: '3px 0 0',
              }}>
                {totalBottles} {totalBottles === 1 ? 'fles' : 'flessen'} · West-Europa
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '10px 16px', flexShrink: 0 }}>
          <input
            className="terroir-input"
            placeholder="Zoek wijn, producent, regio…"
            value={searchTerm}
            onChange={e => onFilterChange && onFilterChange({ ...filter, search: e.target.value })}
          />
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '0',
          borderTop: '1px solid rgba(90,40,0,0.3)',
          borderBottom: '1px solid rgba(90,40,0,0.3)',
          flexShrink: 0,
        }}>
          {[
            { label: 'Flessen', value: totalBottles },
            { label: "Regio's", value: regionCount },
            { label: 'Landen', value: countryCount },
          ].map((stat, i) => (
            <div key={i} style={{
              flex: 1,
              textAlign: 'center',
              padding: '8px 4px',
              borderRight: i < 2 ? '1px solid rgba(90,40,0,0.3)' : 'none',
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#D4A96A',
                lineHeight: 1,
              }}>{stat.value}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgba(200,180,154,0.5)',
                marginTop: '2px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>

          {/* Selected region view */}
          {selectedRegion && regionData ? (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.22em',
                  color: 'rgba(200,180,154,0.5)',
                }}>Geselecteerde regio</span>
                <button
                  onClick={() => onAddToRegion && onAddToRegion(null)}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(90,40,0,0.6)',
                    borderRadius: '6px',
                    color: 'rgba(200,180,154,0.6)',
                    cursor: 'pointer',
                    fontSize: '11px',
                    padding: '2px 8px',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{
                background: 'rgba(61,26,0,0.7)',
                border: '1px solid rgba(90,40,0,0.5)',
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: regionData.color ?? '#8B3A3A',
                    flexShrink: 0,
                  }} />
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#F5EDD8',
                    margin: 0,
                  }}>{regionData.name}</h3>
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '9px',
                    color: '#D4A96A',
                    background: 'rgba(212,169,106,0.12)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}>{regionData.country}</span>
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontStyle: 'italic',
                  color: 'rgba(200,180,154,0.7)',
                  margin: 0,
                  lineHeight: 1.5,
                }}>{regionData.description}</p>
              </div>

              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                textTransform: 'uppercase',
                letterSpacing: '0.22em',
                color: 'rgba(200,180,154,0.5)',
                marginBottom: '8px',
              }}>
                Mijn flessen · {regionBottles.length}
              </div>

              {regionBottles.length === 0 ? (
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontStyle: 'italic',
                  color: 'rgba(200,180,154,0.3)',
                }}>Nog geen flessen in deze regio.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {regionBottles.map(b => (
                    <BottleRow
                      key={b.id}
                      bottle={b}
                      onClick={() => onSelectBottle && onSelectBottle(b)}
                      onDelete={() => onDeleteBottle && onDeleteBottle(b.id)}
                      hovered={hoveredBottle === b.id}
                      onHover={setHoveredBottle}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Full collection */
            <div>
              {filteredCollection.length === 0 ? (
                <div style={{ textAlign: 'center', paddingTop: '40px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px', opacity: 0.3 }}>🍾</div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    color: 'rgba(200,180,154,0.4)',
                    fontStyle: 'italic',
                  }}>
                    {searchTerm ? 'Geen resultaten gevonden.' : 'Scan je eerste fles om te beginnen.'}
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {filteredCollection.map(b => (
                    <BottleRow
                      key={b.id}
                      bottle={b}
                      onClick={() => onSelectBottle && onSelectBottle(b)}
                      onDelete={() => onDeleteBottle && onDeleteBottle(b.id)}
                      hovered={hoveredBottle === b.id}
                      onHover={setHoveredBottle}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function BottleRow({ bottle, onClick, onDelete, hovered, onHover }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover(bottle.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 10px',
        background: hovered ? 'rgba(61,26,0,0.8)' : 'rgba(45,18,0,0.5)',
        border: '1px solid rgba(90,40,0,0.4)',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background 0.12s, border-color 0.12s',
        borderColor: hovered ? 'rgba(90,40,0,0.8)' : 'rgba(90,40,0,0.4)',
        position: 'relative',
      }}
    >
      {/* Thumbnail */}
      {bottle.thumbnail ? (
        <img
          src={bottle.thumbnail}
          alt=""
          style={{
            width: '28px',
            height: '38px',
            objectFit: 'cover',
            borderRadius: '4px',
            border: '1px solid rgba(90,40,0,0.5)',
            flexShrink: 0,
          }}
        />
      ) : (
        <div style={{
          width: '28px',
          height: '38px',
          borderRadius: '4px',
          background: 'rgba(90,40,0,0.2)',
          border: '1px solid rgba(90,40,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          flexShrink: 0,
        }}>🍷</div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '13px',
          fontWeight: 600,
          color: '#F5EDD8',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{bottle.name || bottle.producer || '—'}</div>
        {bottle.producer && bottle.name && (
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            color: 'rgba(200,180,154,0.6)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{bottle.producer}</div>
        )}
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          color: '#D4A96A',
          marginTop: '1px',
        }}>
          {[bottle.vintage, bottle.region].filter(Boolean).join(' · ')}
        </div>
      </div>

      {/* Delete button (shows on hover) */}
      {hovered && (
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(200,80,80,0.7)',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '2px',
            flexShrink: 0,
          }}
          title="Verwijder fles"
        >
          ✕
        </button>
      )}
    </div>
  );
}
