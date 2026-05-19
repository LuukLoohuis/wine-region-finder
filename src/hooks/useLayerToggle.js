import { useState, useCallback } from 'react';

export const LAYER_GROUPS = {
  france: ['fr-regions-fill', 'fr-regions-line', 'fr-depts-line', 'fr-regions-label'],
  italy:  ['it-regions-fill', 'it-regions-line', 'it-provinces-line', 'it-regions-label'],
  spain:  ['es-regions-fill', 'es-regions-line', 'es-regions-label'],
};

export function useLayerToggle(mapRef) {
  const [visibility, setVisibility] = useState({ france: true, italy: true, spain: true });

  const toggle = useCallback((country) => {
    const map = mapRef.current;
    const next = !visibility[country];
    setVisibility(v => ({ ...v, [country]: next }));

    LAYER_GROUPS[country].forEach(id => {
      if (map?.getLayer(id)) {
        map.setLayoutProperty(id, 'visibility', next ? 'visible' : 'none');
      }
    });
  }, [mapRef, visibility]);

  return { visibility, toggle };
}
