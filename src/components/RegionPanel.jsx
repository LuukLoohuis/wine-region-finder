export default function RegionPanel({ regionData, bottles, onClose, onScan }) {
  if (!regionData) return null;

  const regionBottles = bottles ?? [];

  return (
    <div style={{
      position: 'absolute',
      bottom: '16px',
      right: '16px',
      width: '280px',
      background: 'rgba(28,10,0,0.96)',
      border: '1px solid #5A2800',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      zIndex: 20,
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px 10px',
        borderBottom: '1px solid rgba(90,40,0,0.4)',
        background: 'rgba(45,18,0,0.4)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '8px',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Country label */}
            <div style={{
              fontFamily: '"JetBrains Mono", "Courier New", monospace',
              fontSize: '9px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#D4A96A',
              marginBottom: '3px',
            }}>{regionData.country}</div>

            {/* Region name */}
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '17px',
              fontWeight: 700,
              color: '#F5EDD8',
              margin: 0,
              lineHeight: 1.1,
            }}>{regionData.name}</h3>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(90,40,0,0.3)',
              border: '1px solid rgba(90,40,0,0.5)',
              borderRadius: '6px',
              color: 'rgba(200,180,154,0.6)',
              cursor: 'pointer',
              fontSize: '13px',
              padding: '3px 7px',
              fontFamily: 'Inter, sans-serif',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >✕</button>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '11px',
          fontStyle: 'italic',
          color: 'rgba(200,180,154,0.65)',
          margin: '8px 0 0',
          lineHeight: 1.5,
        }}>{regionData.description}</p>
      </div>

      {/* Sub-regions */}
      {regionData.subregions?.length > 0 && (
        <div style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(90,40,0,0.3)',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'rgba(200,180,154,0.45)',
            marginBottom: '6px',
          }}>Sub-regio's</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {regionData.subregions.map(s => (
              <span key={s} style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                background: 'rgba(90,40,0,0.3)',
                border: '1px solid rgba(90,40,0,0.5)',
                borderRadius: '4px',
                padding: '2px 6px',
                color: 'rgba(200,180,154,0.7)',
              }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Bottles */}
      <div style={{ padding: '10px 16px' }}>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: 'rgba(200,180,154,0.45)',
          marginBottom: '8px',
        }}>
          Mijn flessen · {regionBottles.length}
        </div>

        {regionBottles.length === 0 ? (
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontStyle: 'italic',
            color: 'rgba(200,180,154,0.3)',
            margin: '0 0 10px',
          }}>Nog geen flessen in deze regio.</p>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            maxHeight: '120px',
            overflowY: 'auto',
            marginBottom: '10px',
          }}>
            {regionBottles.map(b => (
              <div key={b.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                {b.thumbnail ? (
                  <img
                    src={b.thumbnail}
                    alt=""
                    style={{
                      width: '22px',
                      height: '30px',
                      objectFit: 'cover',
                      borderRadius: '3px',
                      border: '1px solid rgba(90,40,0,0.4)',
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <div style={{
                    width: '22px',
                    height: '30px',
                    borderRadius: '3px',
                    background: 'rgba(90,40,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    flexShrink: 0,
                  }}>🍷</div>
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#F5EDD8',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>{b.name || b.producer || '—'}</div>
                  {b.vintage && (
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '9px',
                      color: '#D4A96A',
                    }}>{b.vintage}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="terroir-btn"
            style={{ flex: 1, justifyContent: 'center', padding: '8px', fontSize: '11px' }}
            onClick={onScan}
          >
            + Fles scannen
          </button>
          <button
            className="terroir-btn-ghost"
            style={{ padding: '8px 10px', fontSize: '11px' }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
