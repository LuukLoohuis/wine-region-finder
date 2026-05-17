import { useEffect, useRef, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { REGIONS_GEOJSON } from '../data/wineRegions.js';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN ?? '';

const SOURCE = 'wine-regions';

// Build a GeoJSON FeatureCollection with bottle_count and is_pulsing injected
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
        is_pulsing: f.properties.id === pulsingId ? 1 : 0,
      },
    })),
  };
}

// Fill color based on bottle count using step expression
const fillColorExpr = [
  'step', ['get', 'bottle_count'],
  '#e8ddd0',    // 0 bottles
  1, '#c49a8a', // 1-2
  3, '#8B3A3A', // 3-5
  6, '#5C1A1A', // 6+
];

export default function Map({ collection, selectedRegion, onRegionSelect, pulsingRegion }) {
  const containerRef  = useRef(null);
  const mapRef        = useRef(null);
  const popupRef      = useRef(null);
  const hoveredIdRef  = useRef(null);

  // Keep a ref of selectedRegion so click handlers are never stale
  const selectedRegionRef = useRef(selectedRegion);
  useEffect(() => { selectedRegionRef.current = selectedRegion; }, [selectedRegion]);

  // Sync source data whenever collection or pulsingRegion changes
  const syncSource = useCallback(() => {
    const map = mapRef.current;
    if (!map?.getSource(SOURCE)) return;
    map.getSource(SOURCE).setData(buildGeoJSON(collection, pulsingRegion));
  }, [collection, pulsingRegion]);

  // Sync outline line-width when selectedRegion changes
  const syncSelection = useCallback(() => {
    const map = mapRef.current;
    if (!map?.getLayer('regions-outline')) return;
    map.setPaintProperty('regions-outline', 'line-width', [
      'case', ['==', ['get', 'id'], selectedRegion ?? '__none__'], 2.5, 0.8,
    ]);
  }, [selectedRegion]);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [2.5, 46.5],
      zoom: 4.5,
      minZoom: 3.5,
      maxZoom: 10,
      maxBounds: [[-12, 34], [22, 58]],
    });

    mapRef.current = map;
    popupRef.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 10,
    });

    map.on('load', () => {
      // Add source
      map.addSource(SOURCE, {
        type: 'geojson',
        data: buildGeoJSON([], null),
      });

      // Fill layer
      map.addLayer({
        id: 'regions-fill',
        type: 'fill',
        source: SOURCE,
        paint: {
          'fill-color': fillColorExpr,
          'fill-opacity': ['case', ['==', ['get', 'is_hovered'], 1], 0.95, 0.75],
        },
      });

      // Outline layer
      map.addLayer({
        id: 'regions-outline',
        type: 'line',
        source: SOURCE,
        paint: {
          'line-color': '#ffffff',
          'line-width': 0.8,
        },
      });

      // Label layer
      map.addLayer({
        id: 'regions-labels',
        type: 'symbol',
        source: SOURCE,
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 11,
          'text-anchor': 'center',
          'text-allow-overlap': false,
        },
        paint: {
          'text-color': '#2C1A00',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1.5,
          'text-opacity': ['interpolate', ['linear'], ['zoom'], 3.5, 0, 4.5, 1],
        },
      });

      // Hover: mousemove over fill
      map.on('mousemove', 'regions-fill', (e) => {
        map.getCanvas().style.cursor = 'pointer';
        const feature = e.features[0];
        const p = feature.properties;

        // Update feature state for is_hovered
        if (hoveredIdRef.current !== null && hoveredIdRef.current !== feature.id) {
          map.setFeatureState(
            { source: SOURCE, id: hoveredIdRef.current },
            { is_hovered: 0 }
          );
        }
        hoveredIdRef.current = feature.id;
        map.setFeatureState(
          { source: SOURCE, id: feature.id },
          { is_hovered: 1 }
        );

        popupRef.current
          .setLngLat(e.lngLat)
          .setHTML(
            `<div style="background:#1C0A00;border:1px solid #5A2800;border-radius:8px;padding:8px 12px;color:#F5EDD8">
              <div style="font-size:13px;font-weight:600;font-family:'Playfair Display',serif">${p.name}</div>
              <div style="color:#D4A96A;font-size:10px;margin-top:2px;font-family:Inter,sans-serif">${p.country} · ${p.bottle_count} fles${p.bottle_count !== 1 ? 'sen' : ''}</div>
            </div>`
          )
          .addTo(map);
      });

      // Hover: mouseleave
      map.on('mouseleave', 'regions-fill', () => {
        map.getCanvas().style.cursor = '';
        popupRef.current.remove();
        if (hoveredIdRef.current !== null) {
          map.setFeatureState(
            { source: SOURCE, id: hoveredIdRef.current },
            { is_hovered: 0 }
          );
          hoveredIdRef.current = null;
        }
      });

      // Click: select region and fly to bounds
      map.on('click', 'regions-fill', (e) => {
        const id = e.features[0].properties.id;
        const newSel = id === selectedRegionRef.current ? null : id;
        onRegionSelect(newSel);

        if (newSel) {
          const coords = e.features[0].geometry.coordinates[0];
          const bounds = coords.reduce(
            (b, c) => b.extend(c),
            new mapboxgl.LngLatBounds(coords[0], coords[0])
          );
          map.fitBounds(bounds, { padding: 80, duration: 700, maxZoom: 8 });
        }
      });

      // Double-click on map (outside region click): reset
      map.on('dblclick', () => {
        onRegionSelect(null);
        map.flyTo({ center: [2.5, 46.5], zoom: 4.5, duration: 700 });
      });

      // Load initial data and selection state
      syncSource();
      syncSelection();
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { syncSource(); }, [syncSource]);
  useEffect(() => { syncSelection(); }, [syncSelection]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
  );
}
