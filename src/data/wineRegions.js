// poly(lon1,lat1,lon2,lat2) → closed GeoJSON rectangle
const poly = (lon1, lat1, lon2, lat2) => [[[lon1,lat1],[lon2,lat1],[lon2,lat2],[lon1,lat2],[lon1,lat1]]];
// shape(coords) → closed GeoJSON polygon from custom point list
const shape = (coords) => [[...coords, coords[0]]];

export const REGIONS_GEOJSON = {
  type: 'FeatureCollection',
  features: [

    // ─── ITALY ────────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'piemonte', name: 'Piemonte', country: 'IT', color: '#7A2848',
        subregions: ['Barolo','Barbaresco',"Barbera d'Asti","Moscato d'Asti",'Gavi','Dolcetto'],
        description: 'Nebbiolo: Barolo & Barbaresco. De wijn van koningen.',
      },
      geometry: { type: 'Polygon', coordinates: shape([[6.6,44.0],[9.2,44.0],[9.2,45.9],[7.9,45.9],[6.8,45.4],[6.6,44.0]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'valle-daosta', name: "Valle d'Aosta", country: 'IT', color: '#6B4E8B',
        subregions: ["Petit Arvine",'Petite Rouge','Torrette'],
        description: "Italies kleinste wijnregio. Alpijnse druivenrassen op grote hoogte.",
      },
      geometry: { type: 'Polygon', coordinates: poly(6.8, 45.4, 7.9, 45.95) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'liguria', name: 'Liguria', country: 'IT', color: '#1A8080',
        subregions: ['Cinque Terre','Rossese di Dolceacqua','Vermentino'],
        description: "Smalle kuststrook. Vermentino & Rossese. Cinque Terre-wijnen.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[7.3,43.8],[10.0,43.8],[10.0,44.5],[8.5,44.5],[7.3,44.0],[7.3,43.8]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'lombardia', name: 'Lombardia', country: 'IT', color: '#4A7AB5',
        subregions: ['Franciacorta','Oltrepò Pavese','Valtellina','Lugana'],
        description: "Franciacorta (mousserende wijn), Valtellina Nebbiolo, Lugana Trebbiano.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[8.5,44.7],[11.4,44.7],[11.4,46.5],[10.4,46.5],[9.2,45.9],[8.5,45.9],[8.5,44.7]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'trentino', name: 'Trentino-Alto Adige', country: 'IT', color: '#3A9B5C',
        subregions: ['Alto Adige DOC','Trentino DOC','Teroldego Rotaliano','Santa Maddalena'],
        description: "Noordelijkste regio. Pinot Grigio, Gewurztraminer, Lagrein, Teroldego.",
      },
      geometry: { type: 'Polygon', coordinates: poly(10.4, 45.7, 12.4, 47.1) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'veneto', name: 'Veneto', country: 'IT', color: '#6B5830',
        subregions: ['Amarone','Prosecco','Soave','Valpolicella','Bardolino'],
        description: "Amarone via appassimento. Prosecco, Soave. Italies grootste productieregio.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[10.6,44.8],[12.3,44.8],[12.3,46.7],[10.6,46.7],[10.6,44.8]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'friuli', name: 'Friuli-Venezia Giulia', country: 'IT', color: '#8B4513',
        subregions: ['Collio','Colli Orientali','Isonzo','Friuli Grave'],
        description: "Top witte wijnen: Friulano, Pinot Grigio, Ribolla Gialla. Grens Slovenië.",
      },
      geometry: { type: 'Polygon', coordinates: poly(12.3, 45.6, 13.9, 46.7) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'emilia-romagna', name: 'Emilia-Romagna', country: 'IT', color: '#C04060',
        subregions: ['Lambrusco','Sangiovese di Romagna','Albana di Romagna','Colli Bolognesi'],
        description: "Lambrusco mousserende rode wijn. Sangiovese en Albana uit Romagna.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[9.2,43.7],[12.8,43.7],[12.8,45.1],[9.2,45.1],[9.2,43.7]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'toscane', name: 'Toscana', country: 'IT', color: '#A03828',
        subregions: ['Chianti Classico','Brunello di Montalcino','Bolgheri','Montepulciano','Vernaccia'],
        description: "Sangiovese: Brunello, Chianti Classico. Super-Tuscans: Sassicaia, Ornellaia.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[9.7,42.3],[12.4,42.3],[12.4,44.5],[9.7,44.5],[9.7,42.3]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'umbria', name: 'Umbria', country: 'IT', color: '#9060C0',
        subregions: ['Sagrantino di Montefalco','Torgiano','Orvieto'],
        description: "Sagrantino — krachtigste Italiaanse rode druif. Orvieto voor wit.",
      },
      geometry: { type: 'Polygon', coordinates: poly(11.9, 42.4, 13.3, 43.6) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'marche', name: 'Le Marche', country: 'IT', color: '#20A090',
        subregions: ['Verdicchio dei Castelli di Jesi','Rosso Conero','Montepulciano d\'Abruzzo','Lacrima'],
        description: "Verdicchio: frisse witte wijn. Rosso Conero uit Montepulciano-druif.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[12.1,42.7],[13.9,42.7],[13.9,43.9],[12.1,43.9],[12.1,42.7]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'lazio', name: 'Lazio', country: 'IT', color: '#B08030',
        subregions: ['Frascati','Est! Est!! Est!!!','Cesanese','Marino'],
        description: "Frascati (Malvasia). Cesanese: enige rode DOC in Lazio.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[11.4,40.8],[14.0,40.8],[14.0,42.8],[11.4,42.8],[11.4,40.8]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'abruzzo', name: 'Abruzzo', country: 'IT', color: '#E06030',
        subregions: ['Montepulciano d\'Abruzzo','Trebbiano d\'Abruzzo','Cerasuolo d\'Abruzzo'],
        description: "Montepulciano d'Abruzzo: robuste rode wijn. Gran Sasso gebergte.",
      },
      geometry: { type: 'Polygon', coordinates: poly(13.0, 41.7, 14.8, 42.9) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'molise', name: 'Molise', country: 'IT', color: '#708040',
        subregions: ['Biferno','Pentro di Isernia','Tintilia del Molise'],
        description: "Italies minst bekende regio. Tintilia: autochtone rode druif.",
      },
      geometry: { type: 'Polygon', coordinates: poly(13.8, 41.3, 15.3, 42.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'campania', name: 'Campania', country: 'IT', color: '#C02020',
        subregions: ['Taurasi','Greco di Tufo','Fiano di Avellino','Lacryma Christi'],
        description: "Taurasi: 'De Barolo van het Zuiden'. Greco & Fiano: top witte wijnen.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[13.7,39.9],[15.8,39.9],[15.8,41.5],[13.7,41.5],[13.7,39.9]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'basilicata', name: 'Basilicata', country: 'IT', color: '#8B2080',
        subregions: ['Aglianico del Vulture','Matera'],
        description: "Aglianico del Vulture: vulkanische bodem van Monte Vulture.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[15.4,39.9],[17.0,39.9],[17.0,40.9],[15.4,40.9],[15.4,39.9]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'puglia', name: 'Puglia', country: 'IT', color: '#C07020',
        subregions: ['Primitivo di Manduria','Salice Salentino','Negroamaro','Castel del Monte'],
        description: "Primitivo (Zinfandel), Negroamaro. Hiel van de laars — veel zon.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[14.9,39.3],[18.5,39.3],[18.5,41.9],[15.8,41.9],[14.9,40.9],[14.9,39.3]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'calabria', name: 'Calabria', country: 'IT', color: '#C04000',
        subregions: ['Cirò','Greco di Bianco','Gaglioppo'],
        description: "Cirò: een van de oudste wijnen ter wereld. Gaglioppo hoofddruif.",
      },
      geometry: { type: 'Polygon', coordinates: shape([[15.6,37.9],[16.6,37.9],[16.6,39.8],[15.6,40.1],[15.6,37.9]]) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'sicilie', name: 'Sicilia', country: 'IT', color: '#D07020',
        subregions: ["Nero d'Avola",'Etna','Marsala','Passito di Pantelleria','Cerasuolo di Vittoria'],
        description: "Nero d'Avola, vulkanische Etna-wijnen. Marsala versterkte wijn.",
      },
      geometry: { type: 'Polygon', coordinates: poly(12.2, 36.6, 15.7, 38.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'sardegna', name: 'Sardegna', country: 'IT', color: '#2A9040',
        subregions: ['Cannonau di Sardegna','Vermentino di Gallura','Carignano del Sulcis','Vernaccia di Oristano'],
        description: "Cannonau (Grenache): hoge ouderdom & zondoordrenkted. Vermentino di Gallura DOCG.",
      },
      geometry: { type: 'Polygon', coordinates: poly(8.1, 38.9, 9.8, 41.3) },
    },

    // ─── FRANCE ───────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'bordeaux', name: 'Bordeaux', country: 'FR', color: '#8B3A3A',
        subregions: ['Médoc','Saint-Émilion','Pomerol','Graves','Sauternes'],
        description: "Cabernet Sauvignon & Merlot. Châteaux Lafite, Pétrus, Haut-Brion.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-2.8, 44.0, 0.0, 45.8) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'bourgogne', name: 'Bourgogne', country: 'FR', color: '#722F4A',
        subregions: ['Chablis','Côte de Nuits','Côte de Beaune','Mâconnais','Chalonnaise'],
        description: "Pinot Noir & Chardonnay. Grand crus: Romanée-Conti, Montrachet.",
      },
      geometry: { type: 'Polygon', coordinates: poly(3.9, 46.0, 5.6, 48.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'beaujolais', name: 'Beaujolais', country: 'FR', color: '#B03060',
        subregions: ['Moulin-à-Vent','Fleurie','Morgon','Brouilly','Saint-Amour'],
        description: "Gamay. Crus du Beaujolais: complexe, celwaardige stijl.",
      },
      geometry: { type: 'Polygon', coordinates: poly(4.3, 45.8, 4.9, 46.4) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'rhone', name: 'Rhône', country: 'FR', color: '#9B2030',
        subregions: ['Hermitage','Châteauneuf-du-Pape','Condrieu','Côte-Rôtie','Gigondas'],
        description: "Noord: Syrah solo. Zuid: GSM-blends. Châteauneuf-du-Pape.",
      },
      geometry: { type: 'Polygon', coordinates: poly(4.4, 43.8, 5.6, 46.2) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'champagne', name: 'Champagne', country: 'FR', color: '#C4A84C',
        subregions: ['Montagne de Reims','Vallée de la Marne','Côte des Blancs','Côte de Sézanne'],
        description: "Méthode champenoise. Pinot Noir, Meunier, Chardonnay.",
      },
      geometry: { type: 'Polygon', coordinates: poly(2.9, 48.4, 5.1, 50.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'alsace', name: 'Alsace', country: 'FR', color: '#A05030',
        subregions: ['Riesling Grand Cru','Gewurztraminer','Pinot Gris','Muscat'],
        description: "Droge Riesling, geurige Gewurztraminer langs de Vogezen.",
      },
      geometry: { type: 'Polygon', coordinates: poly(7.0, 47.4, 7.9, 49.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'loire', name: 'Loire', country: 'FR', color: '#708040',
        subregions: ['Muscadet','Sancerre','Vouvray','Chinon','Anjou','Pouilly-Fumé'],
        description: "Sauvignon Blanc (Sancerre), Chenin Blanc (Vouvray), Cabernet Franc.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-2.6, 46.7, 2.8, 47.9) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'languedoc', name: 'Languedoc-Roussillon', country: 'FR', color: '#B06030',
        subregions: ['Pic Saint-Loup','Corbières','Minervois','Roussillon','Faugères'],
        description: "Grootste wijnregio Frankrijk. Grenache, Syrah, Mourvèdre, Carignan.",
      },
      geometry: { type: 'Polygon', coordinates: poly(1.5, 42.3, 5.2, 44.1) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'provence', name: 'Provence', country: 'FR', color: '#D09070',
        subregions: ['Bandol','Cassis','Les Baux',"Coteaux d'Aix",'Palette'],
        description: "Rosé hoofd productie. Mourvèdre in Bandol, fraaie whites in Cassis.",
      },
      geometry: { type: 'Polygon', coordinates: poly(4.8, 43.0, 7.2, 44.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'sud-ouest', name: 'Sud-Ouest', country: 'FR', color: '#906840',
        subregions: ['Cahors','Bergerac','Madiran','Gaillac','Jurançon'],
        description: "Malbec in Cahors, Tannat in Madiran, Jurançon witte wijnen.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-2.5, 43.0, 2.0, 44.9) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'jura', name: 'Jura', country: 'FR', color: '#A08050',
        subregions: ['Arbois','Château-Chalon','Vin Jaune','L\'Étoile'],
        description: "Vin Jaune (gele wijn) uit Savagnin. Uniek oxidatief rijpingsproces.",
      },
      geometry: { type: 'Polygon', coordinates: poly(5.4, 46.2, 6.2, 47.5) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'savoie', name: 'Savoie', country: 'FR', color: '#6080A0',
        subregions: ['Roussette de Savoie','Crépy','Apremont','Chignin'],
        description: "Alpijnse witte wijnen: Jacquère, Altesse (Roussette). Licht & fris.",
      },
      geometry: { type: 'Polygon', coordinates: poly(5.9, 45.4, 7.0, 46.4) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'corse', name: 'Corse', country: 'FR', color: '#508060',
        subregions: ['Patrimonio','Ajaccio','Vin de Corse','Muscat du Cap Corse'],
        description: "Nielluccio (Sangiovese), Sciacarellu, Vermentino. Mediterraan eilandklimaat.",
      },
      geometry: { type: 'Polygon', coordinates: poly(8.5, 41.3, 9.6, 43.0) },
    },

    // ─── SPAIN ────────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'rioja', name: 'Rioja', country: 'ES', color: '#C4501C',
        subregions: ['Rioja Alta','Rioja Alavesa','Rioja Oriental'],
        description: "Tempranillo. Crianza, Reserva, Gran Reserva. Klassieke Spaanse stijl.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-3.1, 42.0, -1.7, 43.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'ribera', name: 'Ribera del Duero', country: 'ES', color: '#A03820',
        subregions: ['Vega Sicilia','Pingus','Pesquera','Aalto'],
        description: "Tinto Fino op grote hoogte. Vega Sicilia — Spanje's Pétrus.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-4.6, 41.2, -2.9, 42.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'priorat', name: 'Priorat', country: 'ES', color: '#8B3820',
        subregions: ['Gratallops','Porrera','Bellmunt','Lloà'],
        description: "Llicorella leisteenbodem. Garnacha + Cariñena, extreem geconcentreerd.",
      },
      geometry: { type: 'Polygon', coordinates: poly(0.5, 41.0, 1.1, 41.5) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'penedes', name: 'Penedès', country: 'ES', color: '#D4A030',
        subregions: ['Cava','Alt Penedès','Baix Penedès','Xarel·lo'],
        description: "Cava mousserende wijn. Macabeo, Xarel·lo, Parellada. Nabij Barcelona.",
      },
      geometry: { type: 'Polygon', coordinates: poly(1.3, 41.1, 2.1, 41.6) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'rias-baixas', name: 'Rías Baixas', country: 'ES', color: '#507060',
        subregions: ['Val do Salnés','O Rosal','Condado do Tea','Ribeira do Ulla'],
        description: "Albariño. Frisse aromatische witte wijn. Galicische kust.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-9.0, 42.0, -8.0, 43.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'navarra', name: 'Navarra', country: 'ES', color: '#C06840',
        subregions: ['Baja Montaña','Valdizarbe','Tierra Estella','Ribera Alta'],
        description: "Grenache rosé, Tempranillo, Cabernet Sauvignon. Grens met Rioja.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-2.0, 41.9, -1.0, 43.1) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'rueda', name: 'Rueda', country: 'ES', color: '#90A040',
        subregions: ['Verdejo Rueda','Rueda Espumoso','Rueda Pálido'],
        description: "Verdejo: frisse witte wijn. Best verkochte witte DO van Spanje.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-5.1, 41.1, -3.9, 41.9) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'jerez', name: 'Jerez', country: 'ES', color: '#A07840',
        subregions: ['Fino','Manzanilla','Oloroso','Amontillado','Pedro Ximénez'],
        description: "Sherry via solera-systeem. Palomino & Pedro Ximénez.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-6.2, 36.5, -5.5, 36.9) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'jumilla', name: 'Jumilla', country: 'ES', color: '#803020',
        subregions: ['Monastrell Jumilla','Casa Castillo'],
        description: "Monastrell (Mourvèdre) op oude droge leistenen. Krachtig en donker.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-1.9, 38.3, -0.9, 39.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'la-mancha', name: 'La Mancha', country: 'ES', color: '#B09040',
        subregions: ['Valdepeñas','Manzanares','Tomelloso'],
        description: "Grootste aaneengesloten wijnregio ter wereld. Airén & Tempranillo.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-4.8, 38.5, -1.8, 40.0) },
    },

    // ─── GERMANY ──────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'mosel', name: 'Mosel', country: 'DE', color: '#4A6880',
        subregions: ['Bernkastel','Piesport','Wehlen','Zeltingen','Brauneberg'],
        description: "Steile leisteen. Riesling met fijne zuur en mineralen.",
      },
      geometry: { type: 'Polygon', coordinates: poly(6.4, 49.5, 7.7, 50.6) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'rheingau', name: 'Rheingau', country: 'DE', color: '#387060',
        subregions: ['Johannisberg','Schloss Vollrads','Rüdesheim','Hochheim'],
        description: "Krachtige droge Riesling Spätlese langs de Rijn.",
      },
      geometry: { type: 'Polygon', coordinates: poly(7.8, 49.8, 8.6, 50.3) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'rheinhessen', name: 'Rheinhessen', country: 'DE', color: '#507850',
        subregions: ['Nierstein','Oppenheim','Nackenheim','Worms'],
        description: "Duitslands grootste wijnregio. Silvaner, Riesling, Dornfelder.",
      },
      geometry: { type: 'Polygon', coordinates: poly(7.8, 49.5, 8.6, 50.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'pfalz', name: 'Pfalz', country: 'DE', color: '#5A7040',
        subregions: ['Deidesheim','Forst','Wachenheim','Ruppertsberg'],
        description: "Warm microklimaat. Rijpe Riesling en Spätburgunder (Pinot Noir).",
      },
      geometry: { type: 'Polygon', coordinates: poly(7.7, 49.0, 8.4, 49.7) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'nahe', name: 'Nahe', country: 'DE', color: '#608070',
        subregions: ['Bad Kreuznach','Schlossböckelheim','Niederhausen'],
        description: "Vulkanische bodem. Mineralische Riesling tussen Mosel en Rheingau stijl.",
      },
      geometry: { type: 'Polygon', coordinates: poly(7.4, 49.6, 8.0, 50.2) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'baden', name: 'Baden', country: 'DE', color: '#487050',
        subregions: ['Kaiserstuhl','Ortenau','Markgräflerland','Bodensee'],
        description: "Zuidelijkste Duits wijngebied. Grauburgunder, Weißburgunder, Spätburgunder.",
      },
      geometry: { type: 'Polygon', coordinates: poly(7.5, 47.5, 8.5, 49.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'franken', name: 'Franken', country: 'DE', color: '#9A8040',
        subregions: ['Würzburg','Iphofen','Volkach','Randersacker'],
        description: "Bocksbeutel fles. Silvaner & Bacchus. Droog en mineraalrijk.",
      },
      geometry: { type: 'Polygon', coordinates: poly(9.5, 49.6, 11.0, 50.4) },
    },

    // ─── PORTUGAL ─────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'douro', name: 'Douro', country: 'PT', color: '#8B4520',
        subregions: ['Cima Corgo','Baixo Corgo','Douro Superior','Pinhão'],
        description: "Porto + droge rode Douro. Touriga Nacional, Touriga Franca.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.1, 40.7, -6.7, 41.7) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'alentejo', name: 'Alentejo', country: 'PT', color: '#A06030',
        subregions: ['Évora','Borba','Redondo','Reguengos','Vidigueira'],
        description: "Warm plateau. Aragonez, Alicante Bouschet. Rijpe zachte stijl.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.6, 37.4, -6.9, 39.1) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'vinho-verde', name: 'Vinho Verde', country: 'PT', color: '#4A7840',
        subregions: ['Monção','Melgaço','Lima','Cávado','Basto'],
        description: "Frisse licht-pétillant witte wijn. Loureiro, Arinto, Alvarinho.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.8, 41.3, -7.5, 42.2) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'dao', name: 'Dão', country: 'PT', color: '#5A6040',
        subregions: ['Serra da Estrela','Terras de Senhorim','Besteiros'],
        description: "Granietbodem. Touriga Nacional droog en elegant.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.0, 40.3, -7.1, 40.9) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'bairrada', name: 'Bairrada', country: 'PT', color: '#708050',
        subregions: ['Anadia','Mealhada','Sangalhos'],
        description: "Baga: tanninrijke rode wijn. Ook mousserende wijn (espumante).",
      },
      geometry: { type: 'Polygon', coordinates: poly(-8.7, 40.1, -8.0, 40.6) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'setubal', name: 'Península de Setúbal', country: 'PT', color: '#906850',
        subregions: ['Palmela','Setúbal','Arrábida'],
        description: "Moscatel de Setúbal. Castelão. Halfuur van Lissabon.",
      },
      geometry: { type: 'Polygon', coordinates: poly(-9.1, 38.4, -8.5, 38.9) },
    },

    // ─── AUSTRIA ──────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'wachau', name: 'Wachau', country: 'AT', color: '#5080A0',
        subregions: ['Smaragd','Federspiel','Steinfeder','Spitzer Graben'],
        description: "Steile Donauhellingen. Grüner Veltliner & Riesling. UNESCO erfgoed.",
      },
      geometry: { type: 'Polygon', coordinates: poly(15.2, 48.2, 15.7, 48.5) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'burgenland', name: 'Burgenland', country: 'AT', color: '#C06050',
        subregions: ['Neusiedlersee','Mittelburgenland','Südburgenland','Blaufränkischland'],
        description: "Blaufränkisch (Lemberger) & Zweigelt. Neusiedlersee Trockenbeerenauslese.",
      },
      geometry: { type: 'Polygon', coordinates: poly(16.0, 47.0, 17.2, 48.0) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'steiermark', name: 'Steiermark', country: 'AT', color: '#50A060',
        subregions: ['Südsteiermark','Weststeiermark','Vulkanland Steiermark'],
        description: "Sauvignon Blanc & Welschriesling. Steirische Klassik stijl.",
      },
      geometry: { type: 'Polygon', coordinates: poly(14.5, 46.6, 16.1, 47.4) },
    },

    // ─── GREECE ───────────────────────────────────────────────────────────
    {
      type: 'Feature',
      properties: {
        id: 'nemea', name: 'Nemea', country: 'GR', color: '#8B2040',
        subregions: ['Agiorgitiko','Nemea','Koutsi'],
        description: "Agiorgitiko (Sint-Joris druif). Nemea OPAP. Rijke, volle rode wijn.",
      },
      geometry: { type: 'Polygon', coordinates: poly(22.0, 37.6, 23.0, 38.2) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'santorini', name: 'Santorini', country: 'GR', color: '#D4C050',
        subregions: ['Assyrtiko','Nychteri','Vinsanto'],
        description: "Assyrtiko op vulkanisch Santorini. Vinsanto zoete wijn. Minerale frisheid.",
      },
      geometry: { type: 'Polygon', coordinates: poly(25.3, 36.3, 25.5, 36.5) },
    },
    {
      type: 'Feature',
      properties: {
        id: 'macedonia-gr', name: 'Macedonië (GR)', country: 'GR', color: '#604080',
        subregions: ['Naoussa','Amynteo','Goumenissa','Rapsani'],
        description: "Xinomavro: Griekse Nebbiolo. Naoussa OPAP. Krachtig & complex.",
      },
      geometry: { type: 'Polygon', coordinates: poly(21.5, 40.4, 23.5, 41.5) },
    },
  ],
};

export function getRegion(id) {
  return REGIONS_GEOJSON.features.find(f => f.properties.id === id)?.properties ?? null;
}

const ALIASES = {
  burgundy: 'bourgogne', bourgogne: 'bourgogne',
  tuscany: 'toscane', toscana: 'toscane', toscane: 'toscane',
  piedmont: 'piemonte', piemonte: 'piemonte',
  veneto: 'veneto',
  lombardy: 'lombardia', lombardia: 'lombardia',
  liguria: 'liguria',
  'emilia-romagna': 'emilia-romagna', emilia: 'emilia-romagna', romagna: 'emilia-romagna',
  'trentino-alto adige': 'trentino', trentino: 'trentino', 'alto adige': 'trentino', 'südtirol': 'trentino',
  friuli: 'friuli', 'friuli-venezia giulia': 'friuli',
  umbria: 'umbria',
  lazio: 'lazio', latium: 'lazio',
  'le marche': 'marche', marche: 'marche', 'the marches': 'marche',
  abruzzo: 'abruzzo',
  molise: 'molise',
  campania: 'campania',
  basilicata: 'basilicata', lucania: 'basilicata',
  calabria: 'calabria',
  puglia: 'puglia', apulia: 'puglia',
  sicily: 'sicilie', sicilia: 'sicilie', sicilie: 'sicilie',
  sardinia: 'sardegna', sardegna: 'sardegna', sardinia: 'sardegna',
  "valle d'aosta": 'valle-daosta', aosta: 'valle-daosta',
  bordeaux: 'bordeaux',
  champagne: 'champagne',
  alsace: 'alsace',
  loire: 'loire',
  beaujolais: 'beaujolais',
  rhone: 'rhone', rhône: 'rhone',
  provence: 'provence',
  languedoc: 'languedoc', roussillon: 'languedoc',
  jura: 'jura',
  savoie: 'savoie', savoy: 'savoie',
  corsica: 'corse', corse: 'corse',
  rioja: 'rioja',
  ribera: 'ribera', 'ribera del duero': 'ribera',
  priorat: 'priorat', priorato: 'priorat',
  penedes: 'penedes', penedès: 'penedes',
  'rías baixas': 'rias-baixas', 'rias baixas': 'rias-baixas', galicia: 'rias-baixas',
  navarra: 'navarra',
  rueda: 'rueda',
  jerez: 'jerez', sherry: 'jerez',
  jumilla: 'jumilla',
  'la mancha': 'la-mancha',
  mosel: 'mosel', moselle: 'mosel',
  rheingau: 'rheingau',
  rheinhessen: 'rheinhessen',
  pfalz: 'pfalz', palatinate: 'pfalz', 'rheinland-pfalz': 'pfalz',
  nahe: 'nahe',
  franken: 'franken', franconia: 'franken',
  baden: 'baden',
  douro: 'douro', porto: 'douro', port: 'douro',
  alentejo: 'alentejo',
  'vinho verde': 'vinho-verde',
  dao: 'dao', dão: 'dao',
  bairrada: 'bairrada',
  setubal: 'setubal', setúbal: 'setubal',
  wachau: 'wachau',
  burgenland: 'burgenland',
  steiermark: 'steiermark', styria: 'steiermark',
  nemea: 'nemea',
  santorini: 'santorini',
  naoussa: 'macedonia-gr', macedonia: 'macedonia-gr',
};

const COUNTRY_MAP = {
  france: 'fr', french: 'fr', frankreich: 'fr',
  italy: 'it', italian: 'it', italia: 'it', italie: 'it',
  spain: 'es', spanish: 'es', españa: 'es',
  germany: 'de', german: 'de', deutschland: 'de',
  portugal: 'pt', portuguese: 'pt',
  austria: 'at', austrian: 'at', österreich: 'at',
  greece: 'gr', greek: 'gr', griekenland: 'gr',
};

export function matchRegion(regionStr, country) {
  if (!regionStr) return '';
  const norm = regionStr.toLowerCase().trim();

  for (const [alias, id] of Object.entries(ALIASES)) {
    if (norm === alias || norm.includes(alias)) return id;
  }

  const countryCode = country
    ? (COUNTRY_MAP[country.toLowerCase()] ?? country.toLowerCase().slice(0, 2))
    : null;

  let best = null, bestScore = 0;
  for (const f of REGIONS_GEOJSON.features) {
    const p = f.properties;
    const pName = p.name.toLowerCase();
    let score = 0;
    if (norm === p.id) score += 20;
    if (norm.includes(pName)) score += 10;
    if (pName.includes(norm)) score += 6;
    if (p.id.includes(norm.split(' ')[0])) score += 3;
    if (countryCode && p.country.toLowerCase() === countryCode) score += 2;
    if (score > bestScore) { bestScore = score; best = p.id; }
  }
  return bestScore > 0 ? best : '';
}
