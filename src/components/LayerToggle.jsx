const COUNTRIES = [
  { key: 'france', flag: '🇫🇷', name: 'Frankrijk', sub: "13 regio's · 96 dept." },
  { key: 'italy',  flag: '🇮🇹', name: 'Italië',    sub: "20 regio's · 110 prov." },
  { key: 'spain',  flag: '🇪🇸', name: 'Spanje',    sub: "19 comm. · 96 DO's" },
];

export default function LayerToggle({ visibility, toggle }) {
  return (
    <div style={{
      position: 'absolute', top: 16, left: 16, zIndex: 10,
      background: 'rgba(22,8,0,0.88)',
      backdropFilter: 'blur(20px) saturate(1.4)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
      border: '0.5px solid rgba(201,168,76,0.22)',
      borderRadius: 14,
      padding: '14px 13px',
      width: 210,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <p style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 11, fontWeight: 500,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.7)',
        margin: '0 0 10px 0',
      }}>
        Kaartlagen
      </p>

      {COUNTRIES.map(({ key, flag, name, sub }) => {
        const on = visibility[key];
        return (
          <div
            key={key}
            onClick={() => toggle(key)}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 9px',
              borderRadius: 8,
              marginBottom: 3,
              cursor: 'pointer',
              border: '0.5px solid transparent',
              transition: 'background 180ms ease, border-color 180ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(201,168,76,0.06)';
              e.currentTarget.style.borderColor = 'rgba(201,168,76,0.18)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontSize: 16, lineHeight: 1 }}>{flag}</span>
              <div>
                <p style={{
                  margin: 0, fontSize: 13,
                  color: on ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                  transition: 'color 200ms',
                }}>{name}</p>
                <p style={{
                  margin: 0, fontSize: 10,
                  color: on ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.18)',
                  transition: 'color 200ms',
                }}>{sub}</p>
              </div>
            </div>

            {/* Toggle pill */}
            <div style={{
              width: 38, height: 21,
              borderRadius: 10.5,
              flexShrink: 0,
              transition: 'background 200ms ease',
              background: on
                ? 'linear-gradient(90deg, #B8942A, #C9A84C)'
                : 'rgba(255,255,255,0.1)',
              border: on ? 'none' : '0.5px solid rgba(255,255,255,0.15)',
              position: 'relative',
            }}>
              <div style={{
                width: 15, height: 15,
                borderRadius: '50%',
                background: '#fff',
                position: 'absolute',
                top: 3,
                left: on ? 20 : 3,
                transition: 'left 200ms cubic-bezier(0.34,1.56,0.64,1)',
              }} />
            </div>
          </div>
        );
      })}

      <div style={{
        height: '0.5px',
        background: 'rgba(201,168,76,0.15)',
        margin: '10px 0 8px',
      }} />

      <p style={{
        margin: 0,
        fontSize: 10,
        color: 'rgba(201,168,76,0.45)',
        textAlign: 'center',
        fontStyle: 'italic',
        letterSpacing: '0.04em',
        fontFamily: "'Outfit', sans-serif",
      }}>
        Wijnzones altijd zichtbaar
      </p>
    </div>
  );
}
