import { useState, useCallback } from 'react';
import { matchRegion, getRegion } from '../data/wineRegions.js';

export function useMapRegions() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [pulsingRegion, setPulsingRegion] = useState(null);

  const selectRegion = useCallback((id) => { setSelectedRegion(id); }, []);
  const clearRegion = useCallback(() => setSelectedRegion(null), []);

  const pulseRegion = useCallback((id) => {
    setPulsingRegion(id);
    setTimeout(() => setPulsingRegion(null), 2500);
  }, []);

  const matchAndSelect = useCallback((regionStr, country) => {
    const id = matchRegion(regionStr, country);
    if (id) { setSelectedRegion(id); pulseRegion(id); }
    return id;
  }, [pulseRegion]);

  const regionData = selectedRegion ? getRegion(selectedRegion) : null;

  return { selectedRegion, pulsingRegion, regionData, selectRegion, clearRegion, pulseRegion, matchAndSelect };
}
