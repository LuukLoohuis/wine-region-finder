// Approximate bounding-box polygons [lon, lat] for each wine region
// Used as GeoJSON Polygon features in the D3 map
const rect = (lon1, lat1, lon2, lat2) => [
  [lon1, lat1], [lon2, lat1], [lon2, lat2], [lon1, lat2], [lon1, lat1],
];

export const COUNTRIES = [
  { id: 'FR', name: 'Frankrijk', center: [2.5, 46.5] },
  { id: 'ES', name: 'Spanje',    center: [-3.5, 40.0] },
  { id: 'IT', name: 'Italië',    center: [12.5, 42.5] },
  { id: 'DE', name: 'Duitsland', center: [10.0, 51.0] },
  { id: 'PT', name: 'Portugal',  center: [-8.0, 39.5] },
];

export const WINE_REGIONS = [
  // ── FRANCE ──────────────────────────────────────────────────────────
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    country: 'FR',
    countryName: 'Frankrijk',
    color: '#8B1A2F',
    center: [-0.6, 44.9],
    polygon: rect(-2.8, 44.0, -0.0, 45.8),
    subRegions: ['Médoc', 'Saint-Émilion', 'Pomerol', 'Sauternes', 'Graves', 'Entre-Deux-Mers'],
    description: 'Linkeroever (Médoc) en rechteroever (Saint-Émilion, Pomerol). Cabernet Sauvignon & Merlot domineren.',
  },
  {
    id: 'bourgogne',
    name: 'Bourgogne',
    country: 'FR',
    countryName: 'Frankrijk',
    color: '#6B2040',
    center: [4.7, 47.0],
    polygon: rect(3.9, 45.9, 5.6, 48.3),
    subRegions: ['Chablis', 'Côte de Nuits', 'Côte de Beaune', 'Mâconnais', 'Beaujolais'],
    description: 'Pinot Noir en Chardonnay in grand cru-stijl. Romanée-Conti, Chambolle-Musigny.',
  },
  {
    id: 'rhone',
    name: 'Rhône',
    country: 'FR',
    countryName: 'Frankrijk',
    color: '#9B2030',
    center: [4.9, 44.9],
    polygon: rect(4.4, 43.8, 5.6, 46.2),
    subRegions: ['Châteauneuf-du-Pape', 'Gigondas', 'Hermitage', 'Côte-Rôtie', 'Condrieu'],
    description: 'Noord: Syrah solo. Zuid: GSM-blends (Grenache, Syrah, Mourvèdre).',
  },
  {
    id: 'champagne',
    name: 'Champagne',
    country: 'FR',
    countryName: 'Frankrijk',
    color: '#C4A84C',
    center: [4.0, 49.1],
    polygon: rect(2.9, 48.4, 5.1, 50.0),
    subRegions: ['Montagne de Reims', 'Vallée de la Marne', 'Côte des Blancs', 'Aube'],
    description: 'Méthode champenoise. Pinot Noir, Pinot Meunier, Chardonnay.',
  },
  {
    id: 'alsace',
    name: 'Alsace',
    country: 'FR',
    countryName: 'Frankrijk',
    color: '#A05030',
    center: [7.4, 48.3],
    polygon: rect(7.0, 47.4, 7.9, 49.0),
    subRegions: ['Riesling Grand Cru', 'Gewurztraminer', 'Pinot Gris', 'Muscat'],
    description: 'Droge Riesling, geurige Gewurztraminer. Invloed van Elzas-Lotharingen.',
  },
  {
    id: 'loire',
    name: 'Loire',
    country: 'FR',
    countryName: 'Frankrijk',
    color: '#708040',
    center: [0.0, 47.3],
    polygon: rect(-2.6, 46.7, 2.8, 47.9),
    subRegions: ['Muscadet', 'Sancerre', 'Pouilly-Fumé', 'Vouvray', 'Chinon', 'Anjou'],
    description: 'Sauvignon Blanc (Sancerre), Chenin Blanc (Vouvray), Cabernet Franc (Chinon).',
  },

  // ── SPAIN ────────────────────────────────────────────────────────────
  {
    id: 'rioja',
    name: 'Rioja',
    country: 'ES',
    countryName: 'Spanje',
    color: '#C4501C',
    center: [-2.4, 42.5],
    polygon: rect(-3.1, 42.0, -1.7, 43.0),
    subRegions: ['Rioja Alta', 'Rioja Alavesa', 'Rioja Oriental'],
    description: 'Tempranillo-gedomineerd. Crianza, Reserva, Gran Reserva eikenhout.',
  },
  {
    id: 'ribera',
    name: 'Ribera del Duero',
    country: 'ES',
    countryName: 'Spanje',
    color: '#B04020',
    center: [-3.8, 41.6],
    polygon: rect(-4.6, 41.2, -2.9, 42.0),
    subRegions: ['Pesquera', 'Vega Sicilia', 'Pingus'],
    description: 'Tinto Fino (Tempranillo kloon) op grote hoogte. Vega Sicilia — Spanje\'s Petrus.',
  },
  {
    id: 'priorat',
    name: 'Priorat',
    country: 'ES',
    countryName: 'Spanje',
    color: '#8B3820',
    center: [0.75, 41.2],
    polygon: rect(0.5, 41.0, 1.1, 41.5),
    subRegions: ['Gratallops', 'Porrera', 'Lloà', 'Bellmunt del Priorat'],
    description: 'Llicorella (leisteenbodem). Garnacha + Cariñena, extreem geconcentreerd.',
  },

  // ── ITALY ────────────────────────────────────────────────────────────
  {
    id: 'toscane',
    name: 'Toscane',
    country: 'IT',
    countryName: 'Italië',
    color: '#A03828',
    center: [11.2, 43.3],
    polygon: rect(10.4, 42.4, 12.1, 44.1),
    subRegions: ['Chianti Classico', 'Brunello di Montalcino', 'Bolgheri', 'Vino Nobile di Montepulciano'],
    description: 'Sangiovese als basis. Brunello, Super-Tuscans (Sassicaia, Ornellaia).',
  },
  {
    id: 'piemonte',
    name: 'Piemonte',
    country: 'IT',
    countryName: 'Italië',
    color: '#7A2848',
    center: [8.2, 44.7],
    polygon: rect(7.3, 44.1, 9.3, 45.3),
    subRegions: ['Barolo', 'Barbaresco', 'Barbera d\'Asti', 'Moscato d\'Asti'],
    description: 'Nebbiolo = Barolo & Barbaresco. "De wijn van koningen."',
  },
  {
    id: 'veneto',
    name: 'Veneto',
    country: 'IT',
    countryName: 'Italië',
    color: '#6B5830',
    center: [11.5, 45.4],
    polygon: rect(10.4, 44.9, 12.7, 46.3),
    subRegions: ['Amarone della Valpolicella', 'Soave', 'Prosecco', 'Bardolino'],
    description: 'Amarone: gedroogde druiven (appassimento). Grootste productieregio Italië.',
  },

  // ── GERMANY ──────────────────────────────────────────────────────────
  {
    id: 'mosel',
    name: 'Mosel',
    country: 'DE',
    countryName: 'Duitsland',
    color: '#4A6880',
    center: [7.1, 50.1],
    polygon: rect(6.4, 49.5, 7.7, 50.6),
    subRegions: ['Bernkastel', 'Piesport', 'Wehlen', 'Zeltingen'],
    description: 'Steile leisteenhellingen aan de Moezel. Riesling met fijne zuurgraad en mineralen.',
  },
  {
    id: 'rheingau',
    name: 'Rheingau',
    country: 'DE',
    countryName: 'Duitsland',
    color: '#387060',
    center: [8.1, 50.05],
    polygon: rect(7.8, 49.8, 8.6, 50.3),
    subRegions: ['Schloss Vollrads', 'Johannisberg', 'Rüdesheim', 'Hochheim'],
    description: 'Zuiden Rijn. Krachtige, droge Riesling Spätlese. Historische wijnkloosters.',
  },

  // ── PORTUGAL ─────────────────────────────────────────────────────────
  {
    id: 'douro',
    name: 'Douro',
    country: 'PT',
    countryName: 'Portugal',
    color: '#8B4520',
    center: [-7.4, 41.2],
    polygon: rect(-8.1, 40.7, -6.7, 41.7),
    subRegions: ['Cima Corgo', 'Baixo Corgo', 'Douro Superior'],
    description: 'Portwijn + droge rode Douro. Touriga Nacional, Touriga Franca.',
  },
  {
    id: 'alentejo',
    name: 'Alentejo',
    country: 'PT',
    countryName: 'Portugal',
    color: '#A06030',
    center: [-7.8, 38.2],
    polygon: rect(-8.6, 37.4, -6.9, 39.1),
    subRegions: ['Évora', 'Borba', 'Redondo', 'Reguengos', 'Vidigueira'],
    description: 'Warm, droog plateau. Aragonez (Tempranillo), Alicante Bouschet. Rijpe, zachte stijl.',
  },
];

// Bottle count per region
export function countByRegion(collection) {
  const counts = {};
  for (const bottle of collection) {
    counts[bottle.region] = (counts[bottle.region] ?? 0) + 1;
  }
  return counts;
}

export function getRegion(id) {
  return WINE_REGIONS.find((r) => r.id === id) ?? null;
}
