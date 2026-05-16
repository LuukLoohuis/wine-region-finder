import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { WINE_REGIONS, COUNTRIES, countByRegion } from '../data/wineRegions.js';

// Western Europe ISO numeric country IDs (Natural Earth)
const WEST_EUROPE_IDS = new Set([
  '250', // France
  '724', // Spain
  '380', // Italy
  '276', // Germany
  '620', // Portugal
  '528', // Netherlands
  '756', // Switzerland
  '040', // Austria
  '056', // Belgium
  '442', // Luxembourg
  '208', // Denmark
]);

export default function WineMap({ collection, selectedRegion, onRegionSelect, pulseRegion }) {
  const svgRef    = useRef(null);
  const gRef      = useRef(null);
  const zoomRef   = useRef(null);
  const [worldData, setWorldData] = useState(null);
  const [tooltip,   setTooltip]   = useState(null); // { x, y, region }
  const [breadcrumb, setBreadcrumb] = useState(['Europa']);
  const [zoomLevel,  setZoomLevel]  = useState('europe'); // europe | country | region

  // Fetch world topology once
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((r) => r.json())
      .then(setWorldData)
      .catch(() => console.error('Could not load world map data'));
  }, []);

  // Build / redraw the map
  const draw = useCallback(() => {
    if (!worldData || !svgRef.current) return;

    const svg   = d3.select(svgRef.current);
    const W     = svgRef.current.clientWidth  || 800;
    const H     = svgRef.current.clientHeight || 600;

    svg.attr('viewBox', `0 0 ${W} ${H}`);

    // Mercator projection centered on Western Europe
    const projection = d3.geoMercator()
      .center([5, 46])
      .scale(W * 1.15)
      .translate([W / 2, H / 2]);

    const path = d3.geoPath().projection(projection);

    // Clear
    svg.selectAll('*').remove();

    // Background
    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#EDE8DC');

    const g = svg.append('g');
    gRef.current = g;

    // ── Country outlines ──────────────────────────────────────────────
    const countries = topojson.feature(worldData, worldData.objects.countries);
    const westEurope = countries.features.filter((f) => WEST_EUROPE_IDS.has(String(f.id)));

    g.selectAll('.country-path')
      .data(westEurope)
      .enter()
      .append('path')
      .attr('class', 'country-path')
      .attr('d', path);

    // ── Wine region polygons ──────────────────────────────────────────
    const regionCounts = countByRegion(collection);

    WINE_REGIONS.forEach((region) => {
      const count      = regionCounts[region.id] ?? 0;
      const isSelected = region.id === selectedRegion;
      const isPulse    = region.id === pulseRegion;

      const feature = {
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [region.polygon] },
      };

      // Fill: interpolate from near-white to full region color based on bottle count
      const fillColor = count > 0
        ? d3.interpolateRgb('#F0EAE0', region.color)(Math.min(count / 5, 1))
        : '#D8D0C4';

      const regionPath = g.append('path')
        .datum(feature)
        .attr('class', `region-path${isPulse ? ' region-pulse' : ''}`)
        .attr('d', path)
        .attr('fill', fillColor)
        .attr('stroke', isSelected ? '#4A1528' : region.color)
        .attr('stroke-width', isSelected ? 2.5 : 0.8)
        .attr('opacity', count > 0 ? 0.82 : 0.55)
        .attr('cursor', 'pointer');

      // Region label
      const centroid = path.centroid(feature);
      if (!isNaN(centroid[0])) {
        g.append('text')
          .attr('class', 'region-label')
          .attr('x', centroid[0])
          .attr('y', centroid[1])
          .attr('fill', isSelected ? '#4A1528' : '#3A2010')
          .attr('font-weight', isSelected ? '600' : '400')
          .text(region.name);
      }

      // Interaction
      regionPath
        .on('mouseover', function (event) {
          d3.select(this).attr('opacity', 1).attr('stroke-width', 1.5);
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltip({ x: mx, y: my, region, count });
        })
        .on('mousemove', function (event) {
          const [mx, my] = d3.pointer(event, svgRef.current);
          setTooltip((prev) => prev ? { ...prev, x: mx, y: my } : null);
        })
        .on('mouseout', function () {
          d3.select(this)
            .attr('opacity', count > 0 ? 0.82 : 0.55)
            .attr('stroke-width', isSelected ? 2.5 : 0.8);
          setTooltip(null);
        })
        .on('click', function () {
          onRegionSelect(region.id === selectedRegion ? null : region.id);
          if (region.id !== selectedRegion) {
            zoomToRegion(region, path, projection, svg, g, W, H);
            setBreadcrumb(['Europa', region.countryName, region.name]);
            setZoomLevel('region');
          }
        });
    });

    // ── Zoom behavior ─────────────────────────────────────────────────
    const zoom = d3.zoom()
      .scaleExtent([1, 12])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    // Double-click to reset
    svg.on('dblclick.zoom', null);
    svg.on('dblclick', () => {
      resetZoom(svg, zoom);
      setBreadcrumb(['Europa']);
      setZoomLevel('europe');
      onRegionSelect(null);
    });

  }, [worldData, collection, selectedRegion, pulseRegion, onRegionSelect]);

  useEffect(() => { draw(); }, [draw]);

  // Resize redraw
  useEffect(() => {
    const observer = new ResizeObserver(() => draw());
    if (svgRef.current) observer.observe(svgRef.current.parentElement);
    return () => observer.disconnect();
  }, [draw]);

  return (
    <div className="relative w-full h-full">
      {/* Breadcrumb */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-wine-paper/90 backdrop-blur-sm border border-wine-gold/40 rounded-sm px-3 py-1.5 shadow-sm">
        {breadcrumb.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-wine-gold text-xs">›</span>}
            <button
              onClick={() => {
                if (i === 0) {
                  resetZoom(d3.select(svgRef.current), zoomRef.current);
                  setBreadcrumb(['Europa']);
                  setZoomLevel('europe');
                  onRegionSelect(null);
                }
              }}
              className={`font-mono text-[10px] uppercase tracking-widest transition-colors ${
                i === breadcrumb.length - 1
                  ? 'text-wine-deep font-bold'
                  : 'text-wine-bark hover:text-wine-dark cursor-pointer'
              }`}
            >
              {crumb}
            </button>
          </span>
        ))}
      </div>

      {/* Hint */}
      {zoomLevel !== 'europe' && (
        <div className="absolute top-3 right-3 z-10 bg-wine-paper/80 border border-wine-gold/30 rounded-sm px-2.5 py-1 text-[10px] font-mono text-wine-bark">
          Dubbelklik om te resetten
        </div>
      )}

      <svg ref={svgRef} className="w-full h-full" />

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          <div className="bg-wine-deep text-wine-cream rounded-sm px-3 py-2 shadow-lg border border-wine-gold/30 text-sm min-w-[140px]">
            <div className="font-display font-semibold leading-tight">{tooltip.region.name}</div>
            <div className="font-mono text-[9px] text-wine-gold/80 uppercase tracking-wider mt-0.5">
              {tooltip.region.countryName}
            </div>
            {tooltip.count > 0 ? (
              <div className="mt-1 text-wine-blush text-xs font-body">
                🍷 {tooltip.count} fles{tooltip.count !== 1 ? 'sen' : ''} in kelder
              </div>
            ) : (
              <div className="mt-1 text-wine-bark/60 text-xs font-body italic">
                Nog geen flessen
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function zoomToRegion(region, path, projection, svg, g, W, H) {
  const feature = {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [region.polygon] },
  };
  const bounds  = path.bounds(feature);
  const dx      = bounds[1][0] - bounds[0][0];
  const dy      = bounds[1][1] - bounds[0][1];
  const x       = (bounds[0][0] + bounds[1][0]) / 2;
  const y       = (bounds[0][1] + bounds[1][1]) / 2;
  const scale   = Math.max(1, Math.min(10, 0.75 / Math.max(dx / W, dy / H)));
  const translate = [W / 2 - scale * x, H / 2 - scale * y];

  svg.transition().duration(600).call(
    d3.zoom().transform,
    d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
  );
}

function resetZoom(svg, zoom) {
  if (!zoom) return;
  svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity);
}
