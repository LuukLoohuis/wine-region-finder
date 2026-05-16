// Approximate bounding-box polygons for each wine region
// Coordinates: [longitude, latitude] pairs (GeoJSON convention)
const box = (w, s, e, n) => ({
  type: 'Polygon',
  coordinates: [[[w,s],[e,s],[e,n],[w,n],[w,s]]],
});

export const REGIONS_GEOJSON = {
  type: 'FeatureCollection',
  features: [

    // ─── FRANCE ──────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'bordeaux', name: 'Bordeaux', country: 'France',
        description: 'Cabernet Sauvignon & Merlot. Médoc, Saint-Émilion, Pomerol.',
        subregions: ['Médoc', 'Saint-Émilion', 'Pomerol', 'Sauternes', 'Graves'],
        bottle_count: 0,
      },
      geometry: box(-2.8, 44.0, -0.0, 45.8),
    },
    {
      type: 'Feature',
      properties: {
        id: 'bourgogne', name: 'Bourgogne', country: 'France',
        description: 'Pinot Noir & Chardonnay. Romanée-Conti, Chambolle-Musigny.',
        subregions: ['Chablis', 'Côte de Nuits', 'Côte de Beaune', 'Mâconnais'],
        bottle_count: 0,
      },
      geometry: box(3.8, 45.8, 5.6, 48.3),
    },
    {
      type: 'Feature',
      properties: {
        id: 'rhone', name: 'Rhône', country: 'France',
        description: 'Noord: Syrah solo. Zuid: GSM-blends. Châteauneuf-du-Pape.',
        subregions: ['Châteauneuf-du-Pape', 'Gigondas', 'Hermitage', 'Côte-Rôtie'],
        bottle_count: 0,
      },
      geometry: box(4.4, 43.8, 5.6, 46.2),
    },
    {
      type: 'Feature',
      properties: {
        id: 'champagne', name: 'Champagne', country: 'France',
        description: 'Méthode champenoise. Pinot Noir, Meunier, Chardonnay.',
        subregions: ['Montagne de Reims', 'Vallée de la Marne', 'Côte des Blancs'],
        bottle_count: 0,
      },
      geometry: box(2.9, 48.4, 5.1, 50.0),
    },
    {
      type: 'Feature',
      properties: {
        id: 'alsace', name: 'Alsace', country: 'France',
        description: 'Riesling, Gewurztraminer, Pinot Gris. Droge stijl.',
        subregions: ['Riesling Grand Cru', 'Gewurztraminer', 'Pinot Gris'],
        bottle_count: 0,
      },
      geometry: box(7.0, 47.4, 7.9, 49.0),
    },
    {
      type: 'Feature',
      properties: {
        id: 'loire', name: 'Loire', country: 'France',
        description: 'Sauvignon Blanc, Chenin Blanc, Cabernet Franc.',
        subregions: ['Muscadet', 'Sancerre', 'Pouilly-Fumé', 'Vouvray', 'Chinon'],
        bottle_count: 0,
      },
      geometry: box(-2.6, 46.7, 2.8, 47.9),
    },

    // ─── SPAIN ───────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'rioja', name: 'Rioja', country: 'Spain',
        description: 'Tempranillo met eikenhout. Crianza, Reserva, Gran Reserva.',
        subregions: ['Rioja Alta', 'Rioja Alavesa', 'Rioja Oriental'],
        bottle_count: 0,
      },
      geometry: box(-3.1, 42.0, -1.7, 43.0),
    },
    {
      type: 'Feature',
      properties: {
        id: 'ribera', name: 'Ribera del Duero', country: 'Spain',
        description: 'Tinto Fino op grote hoogte. Vega Sicilia, Pingus.',
        subregions: ['Pesquera', 'Vega Sicilia', 'Pingus'],
        bottle_count: 0,
      },
      geometry: box(-4.6, 41.2, -2.9, 42.0),
    },
    {
      type: 'Feature',
      properties: {
        id: 'priorat', name: 'Priorat', country: 'Spain',
        description: 'Llicorella leisteen. Garnacha + Cariñena — extreem geconcentreerd.',
        subregions: ['Gratallops', 'Porrera', 'Bellmunt del Priorat'],
        bottle_count: 0,
      },
      geometry: box(0.5, 41.0, 1.1, 41.5),
    },

    // ─── ITALY ───────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'toscane', name: 'Toscane', country: 'Italy',
        description: 'Sangiovese: Brunello, Chianti Classico, Super-Tuscans.',
        subregions: ['Chianti Classico', 'Brunello di Montalcino', 'Bolgheri'],
        bottle_count: 0,
      },
      geometry: box(10.4, 42.4, 12.1, 44.1),
    },
    {
      type: 'Feature',
      properties: {
        id: 'piemonte', name: 'Piemonte', country: 'Italy',
        description: 'Nebbiolo: Barolo & Barbaresco — "de wijn van koningen".',
        subregions: ['Barolo', 'Barbaresco', "Barbera d'Asti", "Moscato d'Asti"],
        bottle_count: 0,
      },
      geometry: box(7.3, 44.1, 9.3, 45.3),
    },
    {
      type: 'Feature',
      properties: {
        id: 'veneto', name: 'Veneto', country: 'Italy',
        description: 'Amarone (appassimento), Soave, Prosecco, Bardolino.',
        subregions: ['Amarone della Valpolicella', 'Soave', 'Prosecco'],
        bottle_count: 0,
      },
      geometry: box(10.4, 44.9, 12.7, 46.3),
    },

    // ─── GERMANY ─────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'mosel', name: 'Mosel', country: 'Germany',
        description: 'Steile leisteenhellingen. Riesling met fijne zuurgraad en mineralen.',
        subregions: ['Bernkastel', 'Piesport', 'Wehlen', 'Zeltingen'],
        bottle_count: 0,
      },
      geometry: box(6.4, 49.5, 7.8, 50.6),
    },
    {
      type: 'Feature',
      properties: {
        id: 'rheingau', name: 'Rheingau', country: 'Germany',
        description: 'Droge Riesling Spätlese langs de Rijn. Schloss Vollrads.',
        subregions: ['Schloss Vollrads', 'Johannisberg', 'Rüdesheim'],
        bottle_count: 0,
      },
      geometry: box(7.8, 49.8, 8.6, 50.3),
    },

    // ─── PORTUGAL ────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'douro', name: 'Douro', country: 'Portugal',
        description: 'Port + droge Douro. Touriga Nacional, Touriga Franca.',
        subregions: ['Cima Corgo', 'Baixo Corgo', 'Douro Superior'],
        bottle_count: 0,
      },
      geometry: box(-8.1, 40.7, -6.7, 41.7),
    },
    {
      type: 'Feature',
      properties: {
        id: 'alentejo', name: 'Alentejo', country: 'Portugal',
        description: 'Warm plateau. Aragonez, Alicante Bouschet. Zachte rijpe stijl.',
        subregions: ['Évora', 'Borba', 'Redondo', 'Reguengos'],
        bottle_count: 0,
      },
      geometry: box(-8.6, 37.4, -6.9, 39.1),
    },
  ],
};

export function getRegion(id) {
  return REGIONS_GEOJSON.features.find(f => f.properties.id === id)?.properties ?? null;
}

export const REGION_IDS = REGIONS_GEOJSON.features.map(f => f.properties.id);
