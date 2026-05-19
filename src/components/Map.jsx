import { useEffect, useRef, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import bbox from '@turf/bbox';
import LayerToggle from './LayerToggle.jsx';
import { useLayerToggle } from '../hooks/useLayerToggle.js';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

const BASSINS = 'france-bassins';
const AOC_SRC = 'aoc-appellations';
const AOC_TILESET = import.meta.env.VITE_APPELLATION_TILESET ?? 'luuk-loohuis.france-wine-aop';
const ITALY_SRC    = 'italy-wine-municipalities';
const ITALY_BOUNDS = { west: 6.6, east: 18.5, south: 36.6, north: 47.1 };
const SPAIN_SRC    = 'spain-wine-dos';
const SPAIN_BOUNDS = { west: -9.5, east: 4.5, south: 35.9, north: 43.9 };

const SPAIN_TYPE_COLOR = [
  'match', ['get', 'TIPO'],
  'Denominación de Origen Calificada', '#8B1A1A',
  'Denominación de Origen Protegida',  '#A83232',
  'Denominación de Origen',            '#C0503C',
  'Vino de Pago',                      '#7A5C20',
  'Vino de Calidad',                   '#8C6A30',
  '#A06040',
];
const ZOOM_XOVER = 6.0; // zoom where regions → bassins crossover
const ZOOM_AOC   = 8.0; // zoom where bassins → AOC appellations

// ─── Data helpers ────────────────────────────────────────────────────────────

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

export default function Map({ collection, selectedRegion, onRegionSelect, pulsingRegion, mapActionsRef }) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const popupRef     = useRef(null);
  const hoveredRef   = useRef({ source: null, id: null });
  const italyLoadedRef       = useRef(false);
  const spainLoadedRef       = useRef(false);
  const appellationBoundsRef = useRef({});
  const { visibility, toggle } = useLayerToggle(mapRef);

  const [mapError,   setMapError]   = useState(null);
  const [zoomLabel,  setZoomLabel]  = useState("Regio's");
  const [legendOpen, setLegendOpen] = useState(false);
  const [inBassinZoom, setInBassinZoom] = useState(false);

  const selectedRef = useRef(selectedRegion);
  useEffect(() => { selectedRef.current = selectedRegion; }, [selectedRegion]);

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

      // ── Map style overrides ────────────────────────────────────────────
      try {
        map.setPaintProperty('land', 'background-color', '#EDE5D0');
        map.setPaintProperty('water', 'fill-color', '#BAD0DC');
        map.setPaintProperty('admin-0-boundary', 'line-color', '#9E896A');
        map.setPaintProperty('admin-0-boundary', 'line-width', 1.2);
        map.setPaintProperty('country-label', 'text-color', '#4A3520');
        map.setLayoutProperty('country-label', 'text-font', ['DIN Pro Italic', 'Arial Unicode MS Regular']);
      } catch {}

      // ── Hillshading ────────────────────────────────────────────────────
      map.addSource('dem', { type: 'raster-dem', url: 'mapbox://mapbox.mapbox-terrain-dem-v1', tileSize: 512 });
      map.addLayer({
        id: 'hillshading', type: 'hillshade', source: 'dem',
        paint: {
          'hillshade-exaggeration': 0.25,
          'hillshade-shadow-color': '#1C0A00',
          'hillshade-highlight-color': '#F5EFE0',
          'hillshade-illumination-direction': 335,
          'hillshade-accent-color': '#8B7355',
        },
      });

      // ── Admin boundary sources & layers (below wine zones) ─────────────
      map.addSource('fr-regions',  { type: 'geojson', data: '/data/france-regions.geojson' });
      map.addSource('fr-depts',    { type: 'geojson', data: '/data/france-departments.geojson' });
      map.addSource('it-regions',  { type: 'geojson', data: '/data/italy-regions.geojson' });
      map.addSource('it-provinces',{ type: 'geojson', data: '/data/italy-provinces.geojson' });
      map.addSource('es-regions',  { type: 'geojson', data: '/data/spain-regions.geojson' });

      const FILL_OPACITY_EXPR = (zoom1 = 3, zoom2 = 7) => [
        'interpolate', ['linear'], ['zoom'], zoom1, 0.20, 5, 0.14, zoom2, 0.06,
      ];

      // France
      map.addLayer({ id: 'fr-regions-fill', type: 'fill', source: 'fr-regions',
        paint: { 'fill-color': '#722F37', 'fill-opacity': FILL_OPACITY_EXPR() } });
      map.addLayer({ id: 'fr-regions-line', type: 'line', source: 'fr-regions',
        paint: { 'line-color': '#C4677A',
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, 1.0, 6, 1.8, 9, 0.8],
          'line-opacity': 0.65 } });
      map.addLayer({ id: 'fr-depts-line', type: 'line', source: 'fr-depts',
        minzoom: 5.5,
        paint: { 'line-color': '#C4677A', 'line-width': 0.6,
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 5.5, 0.0, 6.5, 0.35],
          'line-dasharray': [3, 3] } });

      // Italy
      map.addLayer({ id: 'it-regions-fill', type: 'fill', source: 'it-regions',
        paint: { 'fill-color': '#4A235A', 'fill-opacity': FILL_OPACITY_EXPR() } });
      map.addLayer({ id: 'it-regions-line', type: 'line', source: 'it-regions',
        paint: { 'line-color': '#8B5FA0',
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, 1.0, 6, 1.8, 9, 0.8],
          'line-opacity': 0.65 } });
      map.addLayer({ id: 'it-provinces-line', type: 'line', source: 'it-provinces',
        minzoom: 5.5,
        paint: { 'line-color': '#8B5FA0', 'line-width': 0.6,
          'line-opacity': ['interpolate', ['linear'], ['zoom'], 5.5, 0.0, 6.5, 0.35],
          'line-dasharray': [3, 3] } });

      // Spain
      map.addLayer({ id: 'es-regions-fill', type: 'fill', source: 'es-regions',
        paint: { 'fill-color': '#1A3A5C', 'fill-opacity': FILL_OPACITY_EXPR() } });
      map.addLayer({ id: 'es-regions-line', type: 'line', source: 'es-regions',
        paint: { 'line-color': '#4A7AB5',
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, 1.0, 6, 1.8, 9, 0.8],
          'line-opacity': 0.65 } });

      // ── Sources ────────────────────────────────────────────────────────
      map.addSource(BASSINS, { type: 'geojson', data: '/data/france-bassins.geojson', generateId: true });
      // AOC vector tileset — added only if env var is configured
      if (AOC_TILESET) {
        map.addSource(AOC_SRC, { type: 'vector', url: `mapbox://${AOC_TILESET}` });
      }

      // ── Fill layers ────────────────────────────────────────────────────

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

      // ── Outline layers ─────────────────────────────────────────────────

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

      // ── Label layers ───────────────────────────────────────────────────

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

      // ── Admin region labels ────────────────────────────────────────────

      const adminLabelPaint = (color) => ({
        'text-color': color,
        'text-halo-color': 'rgba(255,255,255,0.85)',
        'text-halo-width': 1.8,
        'text-opacity': ['interpolate', ['linear'], ['zoom'], 3.5, 0, 4.5, 1, 7.5, 0.6],
      });
      const adminLabelLayout = (field) => ({
        'text-field': ['get', field],
        'text-font': ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 3, 10, 6, 13, 8, 11],
        'text-anchor': 'center',
        'text-allow-overlap': false,
        'text-max-width': 7,
      });

      map.addLayer({ id: 'fr-regions-label', type: 'symbol', source: 'fr-regions',
        maxzoom: 8,
        layout: adminLabelLayout('nom'),
        paint: adminLabelPaint('#7A2030'),
      });
      map.addLayer({ id: 'it-regions-label', type: 'symbol', source: 'it-regions',
        maxzoom: 8,
        layout: adminLabelLayout('reg_name'),
        paint: adminLabelPaint('#4A235A'),
      });
      map.addLayer({ id: 'es-regions-label', type: 'symbol', source: 'es-regions',
        maxzoom: 8,
        layout: adminLabelLayout('shapeName'),
        paint: adminLabelPaint('#1A3A5C'),
      });

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
        const name = BASSIN_LABELS[p.Bassin] ?? p.Bassin;
        popupRef.current
          .setLngLat(e.lngLat)
          .setHTML(`<div style="background:#1C0A00;border:1px solid #5A2800;border-radius:8px;padding:8px 12px;color:#F5EDD8">
            <div style="font-size:13px;font-weight:600;font-family:'Playfair Display',serif">${name}</div>
            <div style="color:#D4A96A;font-size:10px;margin-top:2px;font-family:Inter,sans-serif">FR</div>
          </div>`)
          .addTo(map);
      };

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

      // ── Admin layer hover (province tooltip) ──────────────────────────

      const adminPopup = new mapboxgl.Popup({
        closeButton: false, closeOnClick: false, offset: 12,
        className: 'terroir-popup',
      });

      const ADMIN_HOVER_LAYERS = [
        { id: 'fr-regions-fill', nameKey: 'nom' },
        { id: 'it-regions-fill', nameKey: 'reg_name' },
        { id: 'es-regions-fill', nameKey: 'shapeName' },
      ];

      ADMIN_HOVER_LAYERS.forEach(({ id, nameKey }) => {
        map.on('mousemove', id, (e) => {
          if (map.getLayoutProperty(id, 'visibility') === 'none') return;
          map.getCanvas().style.cursor = 'pointer';
          const name = e.features?.[0]?.properties?.[nameKey] ?? '';
          adminPopup.setLngLat(e.lngLat).setHTML(`<span>${name}</span>`).addTo(map);
        });
        map.on('mouseleave', id, () => {
          map.getCanvas().style.cursor = '';
          adminPopup.remove();
        });
      });

      // ── Click handlers ─────────────────────────────────────────────────

      const onBassinClick = (e) => {
        map.fitBounds(getFitBounds(e.features[0]), { padding: 60, duration: 900, maxZoom: 9 });
      };

      const onAdminClick = (e) => {
        if (!e.features?.[0]) return;
        const b = bbox(e.features[0]);
        map.fitBounds([[b[0], b[1]], [b[2], b[3]]], { padding: 60, duration: 1400, maxZoom: 8 });
      };

      map.on('click', 'bassins-fill', onBassinClick);
      ['fr-regions-fill', 'it-regions-fill', 'es-regions-fill'].forEach(l => map.on('click', l, onAdminClick));

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

      // ── Italy wine zones (lazy loading) ───────────────────────────────────

      function isItalyInView() {
        const b = map.getBounds();
        return b.getEast() > ITALY_BOUNDS.west && b.getWest() < ITALY_BOUNDS.east
            && b.getNorth() > ITALY_BOUNDS.south && b.getSouth() < ITALY_BOUNDS.north;
      }

      async function loadItalyWineData() {
        if (italyLoadedRef.current) return;
        italyLoadedRef.current = true;

        let data;
        try {
          const res = await fetch('/data/italy-wine-municipalities.geojson');
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          data = await res.json();
        } catch (err) {
          console.warn('Italy wine data not available:', err.message);
          italyLoadedRef.current = false;
          return;
        }

        // Build appellation → LngLatBounds lookup for flyTo
        for (const feature of data.features ?? []) {
          const app = feature.properties?.wine_appellation;
          if (!app) continue;
          if (!appellationBoundsRef.current[app]) appellationBoundsRef.current[app] = new mapboxgl.LngLatBounds();
          const geom = feature.geometry;
          const rings = geom?.type === 'Polygon'
            ? [geom.coordinates[0]]
            : (geom?.coordinates ?? []).map(p => p[0]);
          rings.forEach(ring => ring?.forEach(c => appellationBoundsRef.current[app].extend(c)));
        }

        if (map.getSource(ITALY_SRC)) return; // race guard
        map.addSource(ITALY_SRC, { type: 'geojson', data, generateId: true });

        map.addLayer({
          id: 'italy-wine-zones', type: 'fill', source: ITALY_SRC,
          paint: {
            'fill-color': ['get', 'wine_color'],
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hovered'], false], 0.85, 0.65],
          },
        });

        map.addLayer({
          id: 'italy-wine-borders', type: 'line', source: ITALY_SRC,
          paint: {
            'line-color': '#ffffff',
            'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.3, 12, 1.5],
            'line-opacity': 0.7,
          },
        });

        map.addLayer({
          id: 'italy-wine-labels', type: 'symbol', source: ITALY_SRC,
          minzoom: 9,
          layout: {
            'text-field': ['get', 'wine_appellation'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 9, 9, 12, 13],
            'text-anchor': 'center', 'text-allow-overlap': false, 'text-max-width': 8,
          },
          paint: {
            'text-color': '#1C0A00', 'text-halo-color': '#ffffff', 'text-halo-width': 1.5,
            'text-opacity': ['interpolate', ['linear'], ['zoom'], 9, 0, 10, 1],
          },
        });

        // Italy hover
        const italyHover = { id: null };
        map.on('mousemove', 'italy-wine-zones', (e) => {
          const feat = e.features?.[0];
          if (!feat) return;
          if (italyHover.id != null) map.setFeatureState({ source: ITALY_SRC, id: italyHover.id }, { hovered: false });
          italyHover.id = feat.id;
          map.setFeatureState({ source: ITALY_SRC, id: feat.id }, { hovered: true });
          map.getCanvas().style.cursor = 'pointer';
          const p = feat.properties;
          popupRef.current
            .setLngLat(e.lngLat)
            .setHTML(`<div style="background:#1C0A00;border:1px solid #5A2800;border-radius:8px;padding:8px 12px;color:#F5EDD8">
              <div style="font-size:13px;font-weight:600;font-family:'Playfair Display',serif">${p.wine_appellation ?? '?'}</div>
              <div style="color:#D4A96A;font-size:10px;margin-top:2px;font-family:Inter,sans-serif">${p.wine_classification ?? ''} · ${p.wine_region ?? ''}</div>
              ${p.wine_grapes ? `<div style="color:rgba(212,169,106,0.7);font-size:9px;margin-top:2px;font-family:Inter,sans-serif">${p.wine_grapes}</div>` : ''}
            </div>`)
            .addTo(map);
        });
        map.on('mouseleave', 'italy-wine-zones', () => {
          if (italyHover.id != null) map.setFeatureState({ source: ITALY_SRC, id: italyHover.id }, { hovered: false });
          italyHover.id = null;
          map.getCanvas().style.cursor = '';
          popupRef.current.remove();
        });

        // Italy click — zoom to appellation bounds
        map.on('click', 'italy-wine-zones', (e) => {
          const feat = e.features?.[0];
          if (!feat) return;
          const app = feat.properties?.wine_appellation;
          const b = appellationBoundsRef.current[app];
          if (b && !b.isEmpty()) map.fitBounds(b, { padding: 60, duration: 900, maxZoom: 12 });
        });
      }

      // Wire up external flyToItalianAppellation action
      if (mapActionsRef) {
        mapActionsRef.current = {
          flyToItalianAppellation: async (name) => {
            const m = mapRef.current;
            if (!m) return;
            if (!italyLoadedRef.current) {
              m.flyTo({ center: [12.0, 43.5], zoom: 5.5, duration: 800 });
              await new Promise(r => m.once('moveend', r));
              await loadItalyWineData();
              await new Promise(r => setTimeout(r, 300));
            }
            const b = appellationBoundsRef.current[name];
            if (b && !b.isEmpty()) m.fitBounds(b, { padding: 80, duration: 1200, maxZoom: 12 });
          },
        };
      }

      map.on('moveend', () => { if (isItalyInView()) loadItalyWineData(); });
      if (isItalyInView()) loadItalyWineData();

      // ── Spain wine DO zones (lazy loading) ────────────────────────────────

      function isSpainInView() {
        const b = map.getBounds();
        return b.getEast() > SPAIN_BOUNDS.west && b.getWest() < SPAIN_BOUNDS.east
            && b.getNorth() > SPAIN_BOUNDS.south && b.getSouth() < SPAIN_BOUNDS.north;
      }

      async function loadSpainWineData() {
        if (spainLoadedRef.current) return;
        spainLoadedRef.current = true;

        let data;
        try {
          const res = await fetch('/data/spain-wines.geojson');
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          data = await res.json();
        } catch (err) {
          console.warn('Spain wine data not available:', err.message);
          spainLoadedRef.current = false;
          return;
        }

        if (map.getSource(SPAIN_SRC)) return;
        map.addSource(SPAIN_SRC, { type: 'geojson', data, generateId: true });

        map.addLayer({
          id: 'spain-wine-zones', type: 'fill', source: SPAIN_SRC,
          paint: {
            'fill-color': SPAIN_TYPE_COLOR,
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hovered'], false], 0.80, 0.55],
          },
        });

        map.addLayer({
          id: 'spain-wine-borders', type: 'line', source: SPAIN_SRC,
          paint: {
            'line-color': '#ffffff',
            'line-width': ['interpolate', ['linear'], ['zoom'], 5, 0.3, 12, 1.5],
            'line-opacity': 0.6,
          },
        });

        map.addLayer({
          id: 'spain-wine-labels', type: 'symbol', source: SPAIN_SRC,
          minzoom: 7,
          layout: {
            'text-field': ['get', 'NOMBRE'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': ['interpolate', ['linear'], ['zoom'], 7, 8, 12, 13],
            'text-anchor': 'center', 'text-allow-overlap': false, 'text-max-width': 8,
          },
          paint: {
            'text-color': '#1C0A00', 'text-halo-color': '#ffffff', 'text-halo-width': 1.5,
            'text-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1],
          },
        });

        const spainHover = { id: null };
        map.on('mousemove', 'spain-wine-zones', (e) => {
          const feat = e.features?.[0];
          if (!feat) return;
          if (spainHover.id != null) map.setFeatureState({ source: SPAIN_SRC, id: spainHover.id }, { hovered: false });
          spainHover.id = feat.id;
          map.setFeatureState({ source: SPAIN_SRC, id: feat.id }, { hovered: true });
          map.getCanvas().style.cursor = 'pointer';
          const p = feat.properties;
          popupRef.current
            .setLngLat(e.lngLat)
            .setHTML(`<div style="background:#1C0A00;border:1px solid #5A2800;border-radius:8px;padding:8px 12px;color:#F5EDD8">
              <div style="font-size:13px;font-weight:600;font-family:'Playfair Display',serif">${p.NOMBRE ?? p.DENOMINACI ?? '?'}</div>
              <div style="color:#D4A96A;font-size:10px;margin-top:2px;font-family:Inter,sans-serif">${p.TIPO ?? ''} · Spanje</div>
            </div>`)
            .addTo(map);
        });
        map.on('mouseleave', 'spain-wine-zones', () => {
          if (spainHover.id != null) map.setFeatureState({ source: SPAIN_SRC, id: spainHover.id }, { hovered: false });
          spainHover.id = null;
          map.getCanvas().style.cursor = '';
          popupRef.current.remove();
        });

        map.on('click', 'spain-wine-zones', (e) => {
          const feat = e.features?.[0];
          if (!feat) return;
          const geom = feat.geometry;
          const rings = geom?.type === 'MultiPolygon'
            ? geom.coordinates.flatMap(p => p[0])
            : [geom.coordinates[0]];
          const bounds = rings.flat().reduce(
            (b, c) => b.extend(c),
            new mapboxgl.LngLatBounds(rings[0][0], rings[0][0]),
          );
          if (!bounds.isEmpty()) map.fitBounds(bounds, { padding: 60, duration: 900, maxZoom: 11 });
        });
      }

      map.on('moveend', () => { if (isSpainInView()) loadSpainWineData(); });
      if (isSpainInView()) loadSpainWineData();

    });

    return () => { map.remove(); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      <LayerToggle visibility={visibility} toggle={toggle} />

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
