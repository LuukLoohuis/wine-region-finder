import { useEffect, useRef, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { REGIONS_GEOJSON } from '../data/wineRegions.js';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

const SOURCE  = 'wine-regions';
const BASSINS = 'france-bassins';
const OWNED   = 'owned-regions';
const AOC_SRC = 'aoc-appellations';
const AOC_TILESET = import.meta.env.VITE_APPELLATION_TILESET ?? 'luuk-loohuis.france-wine-aop';
const ZOOM_XOVER = 6.0; // zoom where regions → bassins crossover
const ZOOM_AOC   = 8.0; // zoom where bassins → AOC appellations

// ─── Data helpers ────────────────────────────────────────────────────────────

function buildGeoJSON(collection, pulsingId) {
  const counts = {};
  collection.forEach(b => { if (b.region) counts[b.region] = (counts[b.region] ?? 0) + 1; });
  return {
    ...REGIONS_GEOJSON,
    features: REGIONS_GEOJSON.features.map(f => ({
      ...f,
      properties: { ...f.properties, bottle_count: counts[f.properties.id] ?? 0 },
    })),
  };
}

function buildOwnedGeoJSON(collection) {
  const ids = new Set(collection.map(b => b.region).filter(Boolean));
  return {
    type: 'FeatureCollection',
    features: REGIONS_GEOJSON.features.filter(f => ids.has(f.properties.id)),
  };
}

function getFitBounds(feature) {
  const geom = feature.geometry;
  const coords = geom.type === 'MultiPolygon'
    ? geom.coordinates.flatMap(p => p[0])
    : geom.coordinates[0];
  return coords.reduce(
    (b, c) => b.extend(c),
    new mapboxgl.LngLatBounds(coords[0], coords[0])
  );
}

// ─── Mapbox expressions ───────────────────────────────────────────────────────

const BASSIN_COLOR_EXPR = [
  'match', ['get', 'Bassin'],
  'ALSACE ET EST',                    '#A05030',
  'BOURGOGNE BEAUJOLAIS SAVOIE JURA', '#722F4A',
  'CHAMPAGNE',                        '#C4A84C',
  'LANGUEDOC-ROUSSILLON',             '#B06030',
  'PROVENCE-CORSE',                   '#D09070',
  'SUD-OUEST',                        '#906840',
  'TOULOUSE-PYRENEES',                '#9A6040',
  'VAL DE LOIRE',                     '#708040',
  'VALLEE DU RHÔNE',                  '#9B2030',
  'ARMAGNAC',                         '#A07840',
  'COGNAC',                           '#8B4520',
  'VIN DOUX NATURELS',                '#B06880',
  '#888888',
];

const BASSIN_LABEL_EXPR = [
  'match', ['get', 'Bassin'],
  'ALSACE ET EST',                    'Alsace & Est',
  'BOURGOGNE BEAUJOLAIS SAVOIE JURA', 'Bourgogne & Beaujolais',
  'CHAMPAGNE',                        'Champagne',
  'LANGUEDOC-ROUSSILLON',             'Languedoc-Roussillon',
  'PROVENCE-CORSE',                   'Provence-Corse',
  'SUD-OUEST',                        'Sud-Ouest',
  'TOULOUSE-PYRENEES',                'Toulouse-Pyrénées',
  'VAL DE LOIRE',                     'Val de Loire',
  'VALLEE DU RHÔNE',                  'Vallée du Rhône',
  'ARMAGNAC',                         'Armagnac',
  'COGNAC',                           'Cognac',
  'VIN DOUX NATURELS',                'Vins Doux Naturels',
  ['get', 'Bassin'],
];

// JS lookup for popup labels
const BASSIN_LABELS = {
  'ALSACE ET EST': 'Alsace & Est',
  'BOURGOGNE BEAUJOLAIS SAVOIE JURA': 'Bourgogne & Beaujolais',
  'CHAMPAGNE': 'Champagne',
  'LANGUEDOC-ROUSSILLON': 'Languedoc-Roussillon',
  'PROVENCE-CORSE': 'Provence-Corse',
  'SUD-OUEST': 'Sud-Ouest',
  'TOULOUSE-PYRENEES': 'Toulouse-Pyrénées',
  'VAL DE LOIRE': 'Val de Loire',
  'VALLEE DU RHÔNE': 'Vallée du Rhône',
  'ARMAGNAC': 'Armagnac',
  'COGNAC': 'Cognac',
  'VIN DOUX NATURELS': 'Vins Doux Naturels',
};

// Legend data
const LEGEND_ITEMS = [
  { flag: '🇫🇷', label: 'Frankrijk',  sub: 'Bordeaux, Bourgogne, Rhône…' },
  { flag: '🇮🇹', label: 'Italië',     sub: 'Toscana, Piemonte, Veneto…' },
  { flag: '🇪🇸', label: 'Spanje',     sub: 'Rioja, Ribera del Duero…' },
  { flag: '🇩🇪', label: 'Duitsland',  sub: 'Mosel, Rheingau, Pfalz…' },
  { flag: '🇵🇹', label: 'Portugal',   sub: 'Douro, Alentejo…' },
  { flag: '🇦🇹', label: 'Oostenrijk', sub: 'Wachau, Burgenland…' },
  { flag: '🇬🇷', label: 'Griekenland', sub: 'Nemea, Santorini…' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Map({ collection, selectedRegion, onRegionSelect, pulsingRegion }) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const popupRef     = useRef(null);
  const hoveredRef   = useRef({ source: null, id: null });

  const [mapError,   setMapError]   = useState(null);
  const [zoomLabel,  setZoomLabel]  = useState("Regio's");
  const [legendOpen, setLegendOpen] = useState(false);
  const [inBassinZoom, setInBassinZoom] = useState(false);

  const selectedRef = useRef(selectedRegion);
  useEffect(() => { selectedRef.current = selectedRegion; }, [selectedRegion]);

  // ── Sync callbacks ──────────────────────────────────────────────────────

  const syncSource = useCallback(() => {
    const map = mapRef.current;
    if (!map?.getSource(SOURCE)) return;
    map.getSource(SOURCE).setData(buildGeoJSON(collection, pulsingRegion));
  }, [collection, pulsingRegion]);

  const syncSelection = useCallback(() => {
    const map = mapRef.current;
    ['regions-outline-intl', 'regions-outline-fr'].forEach(layer => {
      if (!map?.getLayer(layer)) return;
      map.setPaintProperty(layer, 'line-width', [
        'case', ['==', ['get', 'id'], selectedRegion ?? '__none__'], 3, 0.8,
      ]);
    });
  }, [selectedRegion]);

  const syncOwned = useCallback(() => {
    const map = mapRef.current;
    if (!map?.getSource(OWNED)) return;
    map.getSource(OWNED).setData(buildOwnedGeoJSON(collection));
  }, [collection]);

  // ── Init map ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    if (!mapboxgl.accessToken) { setMapError('Mapbox token ontbreekt'); return; }

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [2.5, 46.5],
      zoom: 4.5,
      minZoom: 3,
      maxZoom: 13,
      maxBounds: [[-14, 33], [24, 60]],
    });

    mapRef.current = map;
    popupRef.current = new mapboxgl.Popup({ closeButton: false, closeOnClick: false, offset: 10 });

    map.on('error', e => {
      const msg = e.error?.message ?? String(e);
      // Only block the map for truly fatal errors (style or token)
      if (msg.includes('access token') || msg.includes('Failed to fetch style')) {
        setMapError(msg);
      } else {
        console.warn('Mapbox error (non-fatal):', msg);
      }
    });

    map.on('load', () => {

      // ── Hillshading ────────────────────────────────────────────────────
      map.addSource('dem', { type: 'raster-dem', url: 'mapbox://mapbox.mapbox-terrain-dem-v1', tileSize: 512 });
      map.addLayer({
        id: 'hillshading', type: 'hillshade', source: 'dem',
        paint: { 'hillshade-exaggeration': 0.35, 'hillshade-shadow-color': '#8B6040', 'hillshade-highlight-color': '#fff' },
      });

      // ── Sources ────────────────────────────────────────────────────────
      map.addSource(SOURCE,  { type: 'geojson', data: buildGeoJSON([], null), generateId: true });
      map.addSource(BASSINS, { type: 'geojson', data: '/data/france-bassins.geojson', generateId: true });
      map.addSource(OWNED,   { type: 'geojson', data: buildOwnedGeoJSON([]) });
      // AOC vector tileset — added only if env var is configured
      if (AOC_TILESET) {
        map.addSource(AOC_SRC, { type: 'vector', url: `mapbox://${AOC_TILESET}` });
      }

      // ── Fill layers ────────────────────────────────────────────────────

      // Non-France regions (always visible)
      map.addLayer({
        id: 'regions-fill-intl', type: 'fill', source: SOURCE,
        filter: ['!=', ['get', 'country'], 'FR'],
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': ['case', ['boolean', ['feature-state', 'hovered'], false], 0.92, 0.72],
        },
      });

      // French large regions (fade out as bassins appear)
      map.addLayer({
        id: 'regions-fill-fr', type: 'fill', source: SOURCE,
        filter: ['==', ['get', 'country'], 'FR'],
        maxzoom: ZOOM_XOVER + 1,
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': [
            'interpolate', ['linear'], ['zoom'],
            ZOOM_XOVER - 0.5, ['case', ['boolean', ['feature-state', 'hovered'], false], 0.92, 0.72],
            ZOOM_XOVER + 0.5, 0,
          ],
        },
      });

      // France bassins (accurate INAO polygons, fade in)
      map.addLayer({
        id: 'bassins-fill', type: 'fill', source: BASSINS,
        minzoom: ZOOM_XOVER - 0.5,
        paint: {
          'fill-color': BASSIN_COLOR_EXPR,
          'fill-opacity': [
            'interpolate', ['linear'], ['zoom'],
            ZOOM_XOVER - 0.5, 0,
            ZOOM_XOVER + 0.5, ['case', ['boolean', ['feature-state', 'hovered'], false], 0.92, 0.75],
          ],
        },
      });

      // AOC appellations fill (vector tileset, zoom 8+)
      if (AOC_TILESET && map.getSource(AOC_SRC)) {
        map.addLayer({
          id: 'aoc-fill', type: 'fill', source: AOC_SRC,
          'source-layer': 'France AOC Wine Regions INAO',
          minzoom: ZOOM_AOC,
          paint: {
            'fill-color': '#7A2030',
            'fill-opacity': ['interpolate', ['linear'], ['zoom'], ZOOM_AOC, 0, ZOOM_AOC + 1, 0.55],
          },
        });
      }

      // Owned regions glow fill
      map.addLayer({
        id: 'owned-fill', type: 'fill', source: OWNED,
        paint: { 'fill-color': '#D4A96A', 'fill-opacity': 0.18 },
      });

      // ── Outline layers ─────────────────────────────────────────────────

      map.addLayer({
        id: 'regions-outline-intl', type: 'line', source: SOURCE,
        filter: ['!=', ['get', 'country'], 'FR'],
        paint: { 'line-color': '#ffffff', 'line-width': 0.8 },
      });

      map.addLayer({
        id: 'regions-outline-fr', type: 'line', source: SOURCE,
        filter: ['==', ['get', 'country'], 'FR'],
        maxzoom: ZOOM_XOVER + 1,
        paint: {
          'line-color': '#ffffff', 'line-width': 0.8,
          'line-opacity': ['interpolate', ['linear'], ['zoom'], ZOOM_XOVER - 0.5, 0.9, ZOOM_XOVER + 0.5, 0],
        },
      });

      map.addLayer({
        id: 'bassins-outline', type: 'line', source: BASSINS,
        minzoom: ZOOM_XOVER - 0.5,
        paint: {
          'line-color': '#ffffff',
          'line-width': ['interpolate', ['linear'], ['zoom'], ZOOM_XOVER, 0.5, 10, 2],
          'line-opacity': ['interpolate', ['linear'], ['zoom'], ZOOM_XOVER - 0.5, 0, ZOOM_XOVER + 0.5, 0.9],
        },
      });

      if (AOC_TILESET && map.getSource(AOC_SRC)) {
        map.addLayer({
          id: 'aoc-outline', type: 'line', source: AOC_SRC,
          'source-layer': 'France AOC Wine Regions INAO',
          minzoom: ZOOM_AOC,
          paint: {
            'line-color': '#ffffff',
            'line-width': ['interpolate', ['linear'], ['zoom'], ZOOM_AOC, 0.3, 13, 1.5],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], ZOOM_AOC, 0, ZOOM_AOC + 1, 0.7],
          },
        });
      }

      map.addLayer({
        id: 'owned-outline', type: 'line', source: OWNED,
        paint: { 'line-color': '#D4A96A', 'line-width': 2.5, 'line-opacity': 0.9 },
      });

      // ── Label layers ───────────────────────────────────────────────────

      map.addLayer({
        id: 'regions-labels', type: 'symbol', source: SOURCE,
        minzoom: 4, maxzoom: ZOOM_XOVER + 0.5,
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 11, 'text-anchor': 'center', 'text-allow-overlap': false,
        },
        paint: {
          'text-color': '#2C1A00', 'text-halo-color': '#ffffff', 'text-halo-width': 1.5,
          'text-opacity': ['interpolate', ['linear'], ['zoom'], 3.5, 0, 4.5, 1],
        },
      });

      map.addLayer({
        id: 'bassins-labels', type: 'symbol', source: BASSINS,
        minzoom: ZOOM_XOVER, maxzoom: ZOOM_AOC + 1,
        layout: {
          'text-field': BASSIN_LABEL_EXPR,
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 13, 'text-anchor': 'center', 'text-allow-overlap': false,
        },
        paint: {
          'text-color': '#1C0A00', 'text-halo-color': '#ffffff', 'text-halo-width': 2,
          'text-opacity': ['interpolate', ['linear'], ['zoom'], ZOOM_XOVER, 0, ZOOM_XOVER + 0.5, 1],
        },
      });

      if (AOC_TILESET && map.getSource(AOC_SRC)) {
        map.addLayer({
          id: 'aoc-labels', type: 'symbol', source: AOC_SRC,
          'source-layer': 'France AOC Wine Regions INAO',
          minzoom: ZOOM_AOC + 1,
          layout: {
            'text-field': ['get', 'app'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 9, 9, 12, 13],
            'text-anchor': 'center', 'text-allow-overlap': false, 'text-max-width': 8,
          },
          paint: {
            'text-color': '#2C1A00', 'text-halo-color': '#ffffff', 'text-halo-width': 1.5,
            'text-opacity': ['interpolate', ['linear'], ['zoom'], ZOOM_AOC + 1, 0, ZOOM_AOC + 2, 1],
          },
        });
      }

      // ── Hover handler ──────────────────────────────────────────────────

      const setHovered = (source, id, val) => {
        if (id == null) return;
        map.setFeatureState({ source, id }, { hovered: val });
      };

      const clearHover = () => {
        const { source, id } = hoveredRef.current;
        if (source && id != null) setHovered(source, id, false);
        hoveredRef.current = { source: null, id: null };
        map.getCanvas().style.cursor = '';
        popupRef.current.remove();
      };

      const onHover = (source) => (e) => {
        const feat = e.features[0];
        const { source: prevSrc, id: prevId } = hoveredRef.current;
        if (prevId != null && (prevId !== feat.id || prevSrc !== source)) setHovered(prevSrc, prevId, false);
        hoveredRef.current = { source, id: feat.id };
        setHovered(source, feat.id, true);
        map.getCanvas().style.cursor = 'pointer';

        const p = feat.properties;
        const name    = source === BASSINS ? (BASSIN_LABELS[p.Bassin] ?? p.Bassin) : p.name;
        const country = source === BASSINS ? 'FR' : p.country;
        const btl     = source === BASSINS ? '' : ` · ${p.bottle_count ?? 0} fles${(p.bottle_count ?? 0) !== 1 ? 'sen' : ''}`;
        popupRef.current
          .setLngLat(e.lngLat)
          .setHTML(`<div style="background:#1C0A00;border:1px solid #5A2800;border-radius:8px;padding:8px 12px;color:#F5EDD8">
            <div style="font-size:13px;font-weight:600;font-family:'Playfair Display',serif">${name}</div>
            <div style="color:#D4A96A;font-size:10px;margin-top:2px;font-family:Inter,sans-serif">${country}${btl}</div>
          </div>`)
          .addTo(map);
      };

      ['regions-fill-intl', 'regions-fill-fr'].forEach(l => {
        map.on('mousemove', l, onHover(SOURCE));
        map.on('mouseleave', l, clearHover);
      });
      map.on('mousemove', 'bassins-fill', onHover(BASSINS));
      map.on('mouseleave', 'bassins-fill', clearHover);

      if (AOC_TILESET && map.getSource(AOC_SRC)) map.on('mousemove', 'aoc-fill', (e) => {
        const feat = e.features?.[0];
        if (!feat) return;
        map.getCanvas().style.cursor = 'pointer';
        const p = feat.properties;
        const label = p.app ?? '?';
        const sub = [p.signe, p.denom].filter(Boolean).join(' · ');
        popupRef.current
          .setLngLat(e.lngLat)
          .setHTML(`<div style="background:#1C0A00;border:1px solid #5A2800;border-radius:8px;padding:8px 12px;color:#F5EDD8">
            <div style="font-size:13px;font-weight:600;font-family:'Playfair Display',serif">${label}</div>
            <div style="color:#D4A96A;font-size:10px;margin-top:2px;font-family:Inter,sans-serif">${sub}</div>
          </div>`)
          .addTo(map);
      });
      if (AOC_TILESET && map.getSource(AOC_SRC)) map.on('mouseleave', 'aoc-fill', () => {
        map.getCanvas().style.cursor = '';
        popupRef.current.remove();
      });

      // ── Click handlers ─────────────────────────────────────────────────

      const onRegionClick = (e) => {
        const id = e.features[0].properties.id;
        const newSel = id === selectedRef.current ? null : id;
        onRegionSelect(newSel);
        if (newSel) map.fitBounds(getFitBounds(e.features[0]), { padding: 80, duration: 900, maxZoom: 8.5 });
      };

      const onBassinClick = (e) => {
        map.fitBounds(getFitBounds(e.features[0]), { padding: 60, duration: 900, maxZoom: 9 });
      };

      ['regions-fill-intl', 'regions-fill-fr'].forEach(l => map.on('click', l, onRegionClick));
      map.on('click', 'bassins-fill', onBassinClick);

      map.on('dblclick', () => {
        onRegionSelect(null);
        map.flyTo({ center: [2.5, 46.5], zoom: 4.5, duration: 700 });
      });

      // ── Zoom tracking ──────────────────────────────────────────────────

      const trackZoom = () => {
        const z = map.getZoom();
        setInBassinZoom(z >= ZOOM_XOVER);
        if (z < ZOOM_XOVER)  setZoomLabel("Regio's");
        else if (z < ZOOM_AOC) setZoomLabel('Bassins');
        else                 setZoomLabel('AOC Appellaties');
      };
      map.on('zoom', trackZoom);
      trackZoom();

      syncSource();
      syncSelection();
      syncOwned();
    });

    return () => { map.remove(); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { syncSource();    }, [syncSource]);
  useEffect(() => { syncSelection(); }, [syncSelection]);
  useEffect(() => { syncOwned();     }, [syncOwned]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* Zoom level pill */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(28,10,0,0.82)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(212,169,106,0.35)', borderRadius: '20px',
        padding: '5px 14px', fontFamily: 'Inter, sans-serif', fontSize: '11px',
        color: '#D4A96A', letterSpacing: '0.12em', pointerEvents: 'none', userSelect: 'none',
        transition: 'opacity 0.3s',
      }}>
        📍 {zoomLabel}
      </div>

      {/* Legend toggle */}
      <div style={{ position: 'absolute', bottom: '16px', right: '16px', zIndex: 20 }}>
        <button
          onClick={() => setLegendOpen(v => !v)}
          style={{
            background: 'rgba(28,10,0,0.88)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(212,169,106,0.3)', borderRadius: '8px',
            color: '#D4A96A', fontFamily: 'Inter, sans-serif', fontSize: '11px',
            padding: '5px 10px', cursor: 'pointer', display: 'block', marginBottom: '6px',
            letterSpacing: '0.1em',
          }}
        >
          {legendOpen ? '✕ Legenda' : '☰ Legenda'}
        </button>

        {legendOpen && (
          <div style={{
            background: 'rgba(28,10,0,0.92)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(212,169,106,0.3)', borderRadius: '8px',
            padding: '12px 14px', minWidth: '200px',
          }}>
            {inBassinZoom ? (
              // Bassin legend
              <>
                <div style={legendHeader}>Franse wijnbassins</div>
                {Object.entries(BASSIN_LABELS).map(([key, label]) => {
                  const colorMap = {
                    'ALSACE ET EST': '#A05030',
                    'BOURGOGNE BEAUJOLAIS SAVOIE JURA': '#722F4A',
                    'CHAMPAGNE': '#C4A84C',
                    'LANGUEDOC-ROUSSILLON': '#B06030',
                    'PROVENCE-CORSE': '#D09070',
                    'SUD-OUEST': '#906840',
                    'TOULOUSE-PYRENEES': '#9A6040',
                    'VAL DE LOIRE': '#708040',
                    'VALLEE DU RHÔNE': '#9B2030',
                    'ARMAGNAC': '#A07840',
                    'COGNAC': '#8B4520',
                    'VIN DOUX NATURELS': '#B06880',
                  };
                  return (
                    <div key={key} style={legendRow}>
                      <div style={{ ...dot, background: colorMap[key] ?? '#888' }} />
                      <span style={legendLabel}>{label}</span>
                    </div>
                  );
                })}
              </>
            ) : (
              // Country legend
              <>
                <div style={legendHeader}>Wijnlanden</div>
                {LEGEND_ITEMS.map(({ flag, label, sub }) => (
                  <div key={label} style={{ ...legendRow, alignItems: 'flex-start', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', marginRight: '8px', flexShrink: 0 }}>{flag}</span>
                    <div>
                      <div style={legendLabel}>{label}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(200,180,154,0.45)', marginTop: '1px' }}>{sub}</div>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(90,40,0,0.3)', marginTop: '8px', paddingTop: '8px' }}>
                  <div style={legendRow}>
                    <div style={{ ...dot, background: '#D4A96A', opacity: 0.7 }} />
                    <span style={legendLabel}>Mijn collectie</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Error overlay */}
      {mapError && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: 'rgba(28,10,0,0.97)',
          flexDirection: 'column', gap: '12px', fontFamily: 'Inter, sans-serif',
          color: '#f9a8a8', fontSize: '13px', padding: '32px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px' }}>⚠</div>
          <div style={{ fontWeight: 600 }}>Kaart kon niet laden</div>
          <div style={{ fontSize: '11px', color: 'rgba(200,180,154,0.5)', maxWidth: '300px' }}>{mapError}</div>
        </div>
      )}
    </div>
  );
}

// ─── Legend styles ────────────────────────────────────────────────────────────

const legendHeader = {
  fontFamily: 'Inter, sans-serif', fontSize: '8px', textTransform: 'uppercase',
  letterSpacing: '0.2em', color: 'rgba(200,180,154,0.5)', marginBottom: '8px',
};
const legendRow = {
  display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px',
};
const dot = {
  width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
};
const legendLabel = {
  fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#C8B49A',
};
