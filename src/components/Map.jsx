import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { REGIONS_GEOJSON } from '../data/regions.js';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

const SOURCE = 'wine-regions';

// Build a GeoJSON FeatureCollection with bottle_count injected into each feature
function buildGeoJSON(collection, pulsingId) {
  const counts = {};
  collection.forEach(b => {
    if (b.region) counts[b.region] = (counts[b.region] ?? 0) + 1;
  });
  return {
    ...REGIONS_GEOJSON,
    features: REGIONS_GEOJSON.features.map(f => ({
      ...f,
      properties: {
        ...f.properties,
        bottle_count: counts[f.properties.id] ?? 0,
        is_pulsing:   f.properties.id === pulsingId ? 1 : 0,
      },
    })),
  };
}

// Color expression: 0 → neutral, 1 → light, 3+ → deep red
const fillColorExpr = [
  'interpolate', ['linear'], ['get', 'bottle_count'],
  0, '#c8b8a2',
  1, '#9B4A5A',
  3, '#722F37',
];

export default function Map({ collection, selectedRegion, onRegionSelect, pulsingRegion }) {
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const popupRef     = useRef(null);

  // Sync source data whenever collection or pulse changes
  const syncSource = useCallback(() => {
    const map = mapRef.current;
    if (!map?.getSource(SOURCE)) return;
    map.getSource(SOURCE).setData(buildGeoJSON(collection, pulsingRegion));
  }, [collection, pulsingRegion]);

  // Paint selected region outline
  const syncSelection = useCallback(() => {
    const map = mapRef.current;
    if (!map?.getLayer('regions-outline')) return;
    const sel = selectedRegion ?? '__none__';
    map.setPaintProperty('regions-outline', 'line-color', [
      'case', ['==', ['get', 'id'], sel], '#f0e8d8', '#6B4040',
    ]);
    map.setPaintProperty('regions-outline', 'line-width', [
      'case', ['==', ['get', 'id'], sel], 2.5, 0.8,
    ]);
    map.setPaintProperty('regions-fill', 'fill-opacity', [
      'case', ['==', ['get', 'id'], sel], 0.88, 0.62,
    ]);
  }, [selectedRegion]);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [5, 46],
      zoom: 4,
      minZoom: 3,
      maxZoom: 10,
    });

    mapRef.current = map;
    popupRef.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 10,
    });

    map.on('load', () => {
      // Source
      map.addSource(SOURCE, {
        type: 'geojson',
        data: buildGeoJSON([], null),
      });

      // Fill
      map.addLayer({
        id: 'regions-fill',
        type: 'fill',
        source: SOURCE,
        paint: {
          'fill-color': fillColorExpr,
          'fill-opacity': 0.62,
        },
      });

      // Outline
      map.addLayer({
        id: 'regions-outline',
        type: 'line',
        source: SOURCE,
        paint: {
          'line-color': '#6B4040',
          'line-width': 0.8,
        },
      });

      // Labels
      map.addLayer({
        id: 'regions-labels',
        type: 'symbol',
        source: SOURCE,
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 4, 9, 7, 13],
          'text-anchor': 'center',
          'text-allow-overlap': false,
        },
        paint: {
          'text-color': '#f0e8d8',
          'text-halo-color': '#1a0a0a',
          'text-halo-width': 1.5,
          'text-opacity': ['interpolate', ['linear'], ['zoom'], 3.5, 0, 4.5, 1],
        },
      });

      // Hover popup
      map.on('mousemove', 'regions-fill', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const p = e.features[0].properties;
        popupRef.current
          .setLngLat(e.lngLat)
          .setHTML(
            `<div style="
              background:#2a1010;border:1px solid #4a2a2a;border-radius:3px;
              padding:8px 12px;font-family:'Playfair Display',serif;
            ">
              <div style="color:#f0e8d8;font-size:13px;font-weight:600">${p.name}</div>
              <div style="color:#c8b8a2;font-size:10px;margin-top:2px;font-family:monospace">
                ${p.country} · ${p.bottle_count} fles${p.bottle_count !== 1 ? 'sen' : ''}
              </div>
            </div>`
          )
          .addTo(map);
      });

      map.on('mouseleave', 'regions-fill', () => {
        map.getCanvas().style.cursor = '';
        popupRef.current.remove();
      });

      // Click: select + zoom
      map.on('click', 'regions-fill', (e) => {
        const id = e.features[0].properties.id;
        const newSel = id === selectedRegionRef.current ? null : id;
        onRegionSelect(newSel);

        if (newSel) {
          // Fit to region bounds
          const coords = e.features[0].geometry.coordinates[0];
          const bounds = coords.reduce(
            (b, c) => b.extend(c),
            new mapboxgl.LngLatBounds(coords[0], coords[0])
          );
          map.fitBounds(bounds, { padding: 80, duration: 700, maxZoom: 8 });
        }
      });

      // Double-click to reset
      map.on('dblclick', () => {
        onRegionSelect(null);
        map.flyTo({ center: [5, 46], zoom: 4, duration: 700 });
      });

      // Initial data
      syncSource();
      syncSelection();
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep a ref of selectedRegion for the click handler (avoids stale closure)
  const selectedRegionRef = useRef(selectedRegion);
  useEffect(() => { selectedRegionRef.current = selectedRegion; }, [selectedRegion]);

  useEffect(() => { syncSource(); },    [syncSource]);
  useEffect(() => { syncSelection(); }, [syncSelection]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Legend */}
      <div className="absolute bottom-6 right-4 bg-wine-panel/90 backdrop-blur-sm panel-border rounded-sm px-3 py-2 text-xs">
        <div className="font-mono text-[9px] uppercase tracking-widest text-wine-light/60 mb-1.5">Kelder dichtheid</div>
        <div className="flex items-center gap-1.5">
          {['#c8b8a2','#B06080','#9B4A5A','#722F37'].map((c, i) => (
            <div key={i} style={{ background: c }} className="w-5 h-3 rounded-sm" />
          ))}
        </div>
        <div className="flex justify-between mt-0.5">
          <span className="font-mono text-[8px] text-wine-light/40">0</span>
          <span className="font-mono text-[8px] text-wine-light/40">3+</span>
        </div>
      </div>

      {/* Zoom reset hint */}
      <div className="absolute top-3 right-3 font-mono text-[9px] text-wine-light/40 bg-wine-panel/70 px-2 py-1 rounded-sm">
        Dubbelklik → reset
      </div>
    </div>
  );
}
