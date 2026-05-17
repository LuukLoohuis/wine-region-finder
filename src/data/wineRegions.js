// Approximate bounding-box polygon helper
// poly(lon1, lat1, lon2, lat2) → closed GeoJSON ring
const poly = (lon1, lat1, lon2, lat2) => [[[lon1,lat1],[lon2,lat1],[lon2,lat2],[lon1,lat2],[lon1,lat1]]];

export const REGIONS_GEOJSON = {
  type: 'FeatureCollection',
  features: [

    // ─── FRANCE ──────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'bordeaux',
        name: 'Bordeaux',
        country: 'FR',
        color: '#8B3A3A',
        subregions: ['Médoc','Saint-Émilion','Pomerol','Graves','Sauternes'],
        description: 'Cabernet Sauvignon & Merlot. Châteaux Lafite, Pétrus, Haut-Brion.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-2.8, 44.0, 0.0, 45.8) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'bourgogne',
        name: 'Bourgogne',
        country: 'FR',
        color: '#722F4A',
        subregions: ['Chablis','Côte de Nuits','Côte de Beaune','Mâconnais'],
        description: 'Pinot Noir & Chardonnay. Grand crus: Romanée-Conti, Montrachet.',
      },
      geometry: { type: 'Polygon', coordinates: poly(3.9, 45.9, 5.6, 48.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'rhone',
        name: 'Rhône',
        country: 'FR',
        color: '#9B2030',
        subregions: ['Hermitage','Châteauneuf-du-Pape','Condrieu','Côte-Rôtie'],
        description: 'Noord: Syrah solo. Zuid: GSM-blends.',
      },
      geometry: { type: 'Polygon', coordinates: poly(4.4, 43.8, 5.6, 46.2) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'champagne',
        name: 'Champagne',
        country: 'FR',
        color: '#C4A84C',
        subregions: ['Montagne de Reims','Vallée de la Marne','Côte des Blancs'],
        description: 'Méthode champenoise. Pinot Noir, Meunier, Chardonnay.',
      },
      geometry: { type: 'Polygon', coordinates: poly(2.9, 48.4, 5.1, 50.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'alsace',
        name: 'Alsace',
        country: 'FR',
        color: '#A05030',
        subregions: ['Riesling Grand Cru','Gewurztraminer','Pinot Gris'],
        description: 'Droge Riesling, geurige Gewurztraminer. Elzas-stijl.',
      },
      geometry: { type: 'Polygon', coordinates: poly(7.0, 47.4, 7.9, 49.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'loire',
        name: 'Loire',
        country: 'FR',
        color: '#708040',
        subregions: ['Muscadet','Sancerre','Vouvray','Chinon'],
        description: 'Sauvignon Blanc, Chenin Blanc, Cabernet Franc.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-2.6, 46.7, 2.8, 47.9) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'languedoc',
        name: 'Languedoc-Roussillon',
        country: 'FR',
        color: '#B06030',
        subregions: ['Pic Saint-Loup','Corbières','Minervois','Roussillon'],
        description: 'Largest wine region France. Grenache, Syrah, Mourvèdre, Carignan.',
      },
      geometry: { type: 'Polygon', coordinates: poly(1.5, 42.3, 5.2, 44.1) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'provence',
        name: 'Provence',
        country: 'FR',
        color: '#C08060',
        subregions: ['Bandol','Cassis','Les Baux',"Coteaux d'Aix"],
        description: 'Rosé hoofd productie. Mourvèdre in Bandol, fraaie whites in Cassis.',
      },
      geometry: { type: 'Polygon', coordinates: poly(4.8, 43.0, 7.2, 44.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'sud-ouest',
        name: 'Sud-Ouest',
        country: 'FR',
        color: '#906840',
        subregions: ['Cahors','Bergerac','Madiran','Gaillac'],
        description: 'Malbec in Cahors, Tannat in Madiran. Rustig en traditioneel.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-2.5, 43.0, 2.0, 44.9) },
    },

    // ─── ITALY ───────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'toscane',
        name: 'Toscane',
        country: 'IT',
        color: '#A03828',
        subregions: ['Chianti Classico','Brunello di Montalcino','Bolgheri','Montepulciano'],
        description: 'Sangiovese basis. Brunello, Super-Tuscans: Sassicaia, Ornellaia.',
      },
      geometry: { type: 'Polygon', coordinates: poly(10.4, 42.4, 12.1, 44.1) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'piemonte',
        name: 'Piemonte',
        country: 'IT',
        color: '#7A2848',
        subregions: ['Barolo','Barbaresco',"Barbera d'Asti","Moscato d'Asti"],
        description: 'Nebbiolo = Barolo & Barbaresco. De wijn van koningen.',
      },
      geometry: { type: 'Polygon', coordinates: poly(7.3, 44.1, 9.3, 45.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'veneto',
        name: 'Veneto',
        country: 'IT',
        color: '#6B5830',
        subregions: ['Amarone','Prosecco','Soave','Valpolicella'],
        description: 'Amarone via appassimento. Italies grootste productieregio.',
      },
      geometry: { type: 'Polygon', coordinates: poly(10.4, 44.9, 12.7, 46.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'sicilie',
        name: 'Sicilië',
        country: 'IT',
        color: '#B06020',
        subregions: ["Nero d'Avola",'Etna','Marsala','Passito di Pantelleria'],
        description: "Nero d'Avola, vulkanische Etna-wijnen. Warm en krachtig.",
      },
      geometry: { type: 'Polygon', coordinates: poly(12.2, 36.6, 15.7, 38.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'puglia',
        name: 'Puglia',
        country: 'IT',
        color: '#956030',
        subregions: ['Primitivo di Manduria','Salice Salentino','Negroamaro'],
        description: 'Primitivo (Zinfandel verwant), Negroamaro. Zuidelijkste grote regio.',
      },
      geometry: { type: 'Polygon', coordinates: poly(14.9, 39.8, 18.5, 41.7) },
    },

    // ─── SPAIN ───────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'rioja',
        name: 'Rioja',
        country: 'ES',
        color: '#C4501C',
        subregions: ['Rioja Alta','Rioja Alavesa','Rioja Baja'],
        description: 'Tempranillo. Crianza, Reserva, Gran Reserva. Klassieke Spaanse stijl.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-3.1, 42.0, -1.7, 43.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'ribera',
        name: 'Ribera del Duero',
        country: 'ES',
        color: '#B04020',
        subregions: ['Vega Sicilia','Pingus','Pesquera'],
        description: "Tinto Fino op grote hoogte. Vega Sicilia — Spanje's Pétrus.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-4.6, 41.2, -2.9, 42.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'priorat',
        name: 'Priorat',
        country: 'ES',
        color: '#8B3820',
        subregions: ['Gratallops','Porrera','Bellmunt'],
        description: 'Llicorella leisteenbodem. Garnacha + Cariñena, extreem geconcentreerd.',
      },
      geometry: { type: 'Polygon', coordinates: poly(0.5, 41.0, 1.1, 41.5) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'rias-baixas',
        name: 'Rías Baixas',
        country: 'ES',
        color: '#507060',
        subregions: ['Val do Salnés','O Rosal','Condado do Tea'],
        description: 'Albariño. Frisse, aromatische witte wijn. Galicische kust.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-9.0, 42.0, -8.0, 43.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'jerez',
        name: 'Jerez',
        country: 'ES',
        color: '#A07840',
        subregions: ['Fino','Manzanilla','Oloroso','Amontillado'],
        description: 'Sherry via solera-systeem. Palomino & Pedro Ximénez.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-6.2, 36.5, -5.5, 36.9) },
    },

    // ─── GERMANY ─────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'mosel',
        name: 'Mosel',
        country: 'DE',
        color: '#4A6880',
        subregions: ['Bernkastel','Piesport','Wehlen','Zeltingen'],
        description: 'Steile leisteen. Riesling met fijne zuur en mineralen.',
      },
      geometry: { type: 'Polygon', coordinates: poly(6.4, 49.5, 7.7, 50.6) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'rheingau',
        name: 'Rheingau',
        country: 'DE',
        color: '#387060',
        subregions: ['Johannisberg','Schloss Vollrads','Rüdesheim'],
        description: 'Krachtige droge Riesling Spätlese langs de Rijn.',
      },
      geometry: { type: 'Polygon', coordinates: poly(7.8, 49.8, 8.6, 50.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'pfalz',
        name: 'Pfalz',
        country: 'DE',
        color: '#5A7040',
        subregions: ['Deidesheim','Forst','Wachenheim','Ruppertsberg'],
        description: 'Warm microklimaat. Rijpe Riesling en Spätburgunder (Pinot Noir).',
      },
      geometry: { type: 'Polygon', coordinates: poly(7.7, 49.0, 8.4, 49.9) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'baden',
        name: 'Baden',
        country: 'DE',
        color: '#487050',
        subregions: ['Kaiserstuhl','Ortenau','Markgräflerland'],
        description: 'Zuidelijkste Duits wijngebied. Grauburgunder, Weißburgunder.',
      },
      geometry: { type: 'Polygon', coordinates: poly(7.5, 47.5, 8.5, 49.0) },
    },

    // ─── PORTUGAL ────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'douro',
        name: 'Douro',
        country: 'PT',
        color: '#8B4520',
        subregions: ['Cima Corgo','Baixo Corgo','Douro Superior'],
        description: 'Porto + droge rode Douro. Touriga Nacional, Touriga Franca.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.1, 40.7, -6.7, 41.7) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'alentejo',
        name: 'Alentejo',
        country: 'PT',
        color: '#A06030',
        subregions: ['Évora','Borba','Redondo','Reguengos'],
        description: 'Warm plateau. Aragonez, Alicante Bouschet. Rijpe zachte stijl.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.6, 37.4, -6.9, 39.1) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'vinho-verde',
        name: 'Vinho Verde',
        country: 'PT',
        color: '#4A7840',
        subregions: ['Monção','Melgaço','Lima','Cávado'],
        description: 'Frisse licht-pétillant witte wijn. Loureiro, Arinto, Alvarinho.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.8, 41.3, -7.5, 42.2) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'dao',
        name: 'Dão',
        country: 'PT',
        color: '#5A6040',
        subregions: ['Serra da Estrela','Terras de Senhorim'],
        description: 'Granietbodem. Touriga Nacional droog en elegant.',
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.0, 40.3, -7.1, 40.9) },
    },
  ],
};

export function getRegion(id) {
  return REGIONS_GEOJSON.features.find(f => f.properties.id === id)?.properties ?? null;
}

export function matchRegion(regionStr, country) {
  if (!regionStr) return '';
  const norm = regionStr.toLowerCase();
  let best = null, bestScore = 0;
  for (const f of REGIONS_GEOJSON.features) {
    const p = f.properties;
    let score = 0;
    if (norm.includes(p.name.toLowerCase())) score += 10;
    if (p.name.toLowerCase().includes(norm)) score += 6;
    if (p.id.includes(norm.split(' ')[0])) score += 4;
    if (country && p.country.toLowerCase() === country.toLowerCase().slice(0, 2)) score += 2;
    if (score > bestScore) { bestScore = score; best = p.id; }
  }
  return bestScore > 0 ? best : '';
}
