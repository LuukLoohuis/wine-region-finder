// Italian DOC/DOCG wine zones mapped to ISTAT municipality codes
// Format: com_istat_code (6-digit string) → { appellation, classification, region, color, grapes, description }

export const ITALY_WINE_ZONES = {

  // ── PIEMONTE ──────────────────────────────────────────────────────────────────

  // Barolo DOCG
  '004014': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — König der Italiaanse wijnen.' },
  '004110': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — La Morra.' },
  '004048': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Castiglione Falletto.' },
  '004218': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Serralunga d\'Alba.' },
  '004149': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Novello.' },
  '004244': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Verduno.' },
  '004100': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Grinzane Cavour.' },
  '004076': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Diano d\'Alba.' },
  '004193': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Roddi.' },
  '004056': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Cherasco.' },
  '004132': { appellation: 'Barolo', classification: 'DOCG', region: 'Piemonte', color: '#8B1A1A', grapes: ['Nebbiolo'], description: 'Barolo — Monforte d\'Alba.' },

  // Barbaresco DOCG
  '004015': { appellation: 'Barbaresco', classification: 'DOCG', region: 'Piemonte', color: '#C0392B', grapes: ['Nebbiolo'], description: 'Barbaresco — elegant en verfijnd.' },
  '004143': { appellation: 'Barbaresco', classification: 'DOCG', region: 'Piemonte', color: '#C0392B', grapes: ['Nebbiolo'], description: 'Barbaresco — Neive.' },
  '004230': { appellation: 'Barbaresco', classification: 'DOCG', region: 'Piemonte', color: '#C0392B', grapes: ['Nebbiolo'], description: 'Barbaresco — Treiso.' },
  '004213': { appellation: 'Barbaresco', classification: 'DOCG', region: 'Piemonte', color: '#C0392B', grapes: ['Nebbiolo'], description: 'Barbaresco — San Rocco Seno d\'Elvio.' },

  // Asti / Moscato d'Asti DOCG
  '005025': { appellation: "Asti / Moscato d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#F4D03F', grapes: ['Moscato Bianco'], description: "Moscato d'Asti — Canelli." },
  '004211': { appellation: "Asti / Moscato d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#F4D03F', grapes: ['Moscato Bianco'], description: "Moscato d'Asti — Santo Stefano Belbo." },
  '005104': { appellation: "Asti / Moscato d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#F4D03F', grapes: ['Moscato Bianco'], description: "Moscato d'Asti — Nizza Monferrato." },
  '005021': { appellation: "Asti / Moscato d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#F4D03F', grapes: ['Moscato Bianco'], description: "Moscato d'Asti — Calosso." },
  '005044': { appellation: "Asti / Moscato d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#F4D03F', grapes: ['Moscato Bianco'], description: "Moscato d'Asti — Costigliole d'Asti." },
  '005106': { appellation: "Asti / Moscato d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#F4D03F', grapes: ['Moscato Bianco'], description: "Moscato d'Asti — San Marzano Oliveto." },

  // Barbera d'Asti DOCG
  '005063': { appellation: "Barbera d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#A93226', grapes: ['Barbera'], description: "Barbera d'Asti — frisse zuren, diepe kleur." },
  '005011': { appellation: "Barbera d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#A93226', grapes: ['Barbera'], description: "Barbera d'Asti — Agliano Terme." },
  '005079': { appellation: "Barbera d'Asti", classification: 'DOCG', region: 'Piemonte', color: '#A93226', grapes: ['Barbera'], description: "Barbera d'Asti — Mombercelli." },

  // Gavi / Cortese di Gavi DOCG
  '006074': { appellation: 'Gavi / Cortese di Gavi', classification: 'DOCG', region: 'Piemonte', color: '#A8D5A2', grapes: ['Cortese'], description: 'Gavi — fris en mineraal.' },
  '006062': { appellation: 'Gavi / Cortese di Gavi', classification: 'DOCG', region: 'Piemonte', color: '#A8D5A2', grapes: ['Cortese'], description: 'Gavi — Francavilla Bisio.' },
  '006052': { appellation: 'Gavi / Cortese di Gavi', classification: 'DOCG', region: 'Piemonte', color: '#A8D5A2', grapes: ['Cortese'], description: 'Gavi — Carrosio.' },
  '006097': { appellation: 'Gavi / Cortese di Gavi', classification: 'DOCG', region: 'Piemonte', color: '#A8D5A2', grapes: ['Cortese'], description: 'Gavi — Novi Ligure.' },
  '006165': { appellation: 'Gavi / Cortese di Gavi', classification: 'DOCG', region: 'Piemonte', color: '#A8D5A2', grapes: ['Cortese'], description: 'Gavi — Tassarolo.' },
  '006017': { appellation: 'Gavi / Cortese di Gavi', classification: 'DOCG', region: 'Piemonte', color: '#A8D5A2', grapes: ['Cortese'], description: 'Gavi — Bosio.' },

  // Brachetto d'Acqui / Acqui DOCG
  '006001': { appellation: "Brachetto d'Acqui / Acqui", classification: 'DOCG', region: 'Piemonte', color: '#E8A0A0', grapes: ['Brachetto'], description: "Brachetto d'Acqui — licht mousserend en zoet." },
  '005015': { appellation: "Brachetto d'Acqui / Acqui", classification: 'DOCG', region: 'Piemonte', color: '#E8A0A0', grapes: ['Brachetto'], description: "Brachetto d'Acqui — Alice Bel Colle." },
  '005135': { appellation: "Brachetto d'Acqui / Acqui", classification: 'DOCG', region: 'Piemonte', color: '#E8A0A0', grapes: ['Brachetto'], description: "Brachetto d'Acqui — Strevi." },

  // Alta Langa DOCG
  '004003': { appellation: 'Alta Langa', classification: 'DOCG', region: 'Piemonte', color: '#D4B483', grapes: ['Pinot Nero', 'Chardonnay'], description: 'Alta Langa — Piemontese mousserende wijn.' },

  // Dogliani DOCG
  '004085': { appellation: 'Dogliani', classification: 'DOCG', region: 'Piemonte', color: '#6B2D2D', grapes: ['Dolcetto'], description: 'Dogliani — Dolcetto op zijn best.' },
  '004090': { appellation: 'Dogliani', classification: 'DOCG', region: 'Piemonte', color: '#6B2D2D', grapes: ['Dolcetto'], description: 'Dogliani — Farigliano.' },
  '004018': { appellation: 'Dogliani', classification: 'DOCG', region: 'Piemonte', color: '#6B2D2D', grapes: ['Dolcetto'], description: 'Dogliani — Belvedere Langhe.' },
  '004031': { appellation: 'Dogliani', classification: 'DOCG', region: 'Piemonte', color: '#6B2D2D', grapes: ['Dolcetto'], description: 'Dogliani — Clavesana.' },

  // Gattinara DOCG
  '002061': { appellation: 'Gattinara', classification: 'DOCG', region: 'Piemonte', color: '#722F37', grapes: ['Nebbiolo'], description: 'Gattinara — Noord-Piemonte Nebbiolo.' },

  // Ghemme DOCG
  '003076': { appellation: 'Ghemme', classification: 'DOCG', region: 'Piemonte', color: '#8B3A3A', grapes: ['Nebbiolo'], description: 'Ghemme — Nebbiolo in Novara.' },

  // Erbaluce di Caluso DOCG
  '001083': { appellation: 'Erbaluce di Caluso', classification: 'DOCG', region: 'Piemonte', color: '#E8E0A0', grapes: ['Erbaluce'], description: 'Erbaluce di Caluso — zeldzame witte druif.' },
  '001133': { appellation: 'Erbaluce di Caluso', classification: 'DOCG', region: 'Piemonte', color: '#E8E0A0', grapes: ['Erbaluce'], description: 'Erbaluce di Caluso — Mazzè.' },
  '001271': { appellation: 'Erbaluce di Caluso', classification: 'DOCG', region: 'Piemonte', color: '#E8E0A0', grapes: ['Erbaluce'], description: 'Erbaluce di Caluso — Vische.' },

  // Dolcetto di Ovada Superiore DOCG
  '006124': { appellation: 'Dolcetto di Ovada Superiore', classification: 'DOCG', region: 'Piemonte', color: '#5C2D2D', grapes: ['Dolcetto'], description: 'Dolcetto di Ovada Superiore.' },
  '006082': { appellation: 'Dolcetto di Ovada Superiore', classification: 'DOCG', region: 'Piemonte', color: '#5C2D2D', grapes: ['Dolcetto'], description: 'Dolcetto di Ovada Superiore — Lerma.' },

  // Ruché di Castagnole Monferrato DOCG
  '005030': { appellation: 'Ruché di Castagnole Monferrato', classification: 'DOCG', region: 'Piemonte', color: '#C0604A', grapes: ['Ruché'], description: 'Ruché di Castagnole Monferrato.' },
  '005058': { appellation: 'Ruché di Castagnole Monferrato', classification: 'DOCG', region: 'Piemonte', color: '#C0604A', grapes: ['Ruché'], description: 'Ruché di Castagnole Monferrato — Grana.' },
  '005084': { appellation: 'Ruché di Castagnole Monferrato', classification: 'DOCG', region: 'Piemonte', color: '#C0604A', grapes: ['Ruché'], description: 'Ruché di Castagnole Monferrato — Montemagno.' },
  '005093': { appellation: 'Ruché di Castagnole Monferrato', classification: 'DOCG', region: 'Piemonte', color: '#C0604A', grapes: ['Ruché'], description: 'Ruché di Castagnole Monferrato — Portacomaro.' },
  '005039': { appellation: 'Ruché di Castagnole Monferrato', classification: 'DOCG', region: 'Piemonte', color: '#C0604A', grapes: ['Ruché'], description: 'Ruché di Castagnole Monferrato — Refrancore.' },
  '005105': { appellation: 'Ruché di Castagnole Monferrato', classification: 'DOCG', region: 'Piemonte', color: '#C0604A', grapes: ['Ruché'], description: 'Ruché di Castagnole Monferrato — Scurzolengo.' },
  '005043': { appellation: 'Ruché di Castagnole Monferrato', classification: 'DOCG', region: 'Piemonte', color: '#C0604A', grapes: ['Ruché'], description: 'Ruché di Castagnole Monferrato — Viarigi.' },

  // ── LOMBARDIA ─────────────────────────────────────────────────────────────────

  // Franciacorta DOCG
  '017019': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Italiës finest bubbels.' },
  '017022': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Capriolo.' },
  '017037': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Coccaglio.' },
  '017041': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Cologne.' },
  '017052': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Erbusco.' },
  '017058': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Rovato.' },
  '017099': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Palazzolo sull\'Oglio.' },
  '017154': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Rodengo-Saiano.' },
  '017172': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Cortefranca.' },
  '017176': { appellation: 'Franciacorta', classification: 'DOCG', region: 'Lombardia', color: '#F7E7B4', grapes: ['Chardonnay', 'Pinot Nero', 'Pinot Bianco'], description: 'Franciacorta — Villa Carcina.' },

  // Sforzato di Valtellina DOCG
  '014005': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — gedroogde Nebbiolo.' },
  '014011': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Bianzone.' },
  '014016': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Castione Andevenno.' },
  '014024': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Chiuro.' },
  '014027': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Dazio.' },
  '014028': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Dubino.' },
  '014031': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Faedo Valtellino.' },
  '014046': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Montagna in Valtellina.' },
  '014050': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Morbegno.' },
  '014061': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Poggiridenti.' },
  '014062': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Ponte in Valtellina.' },
  '014066': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Postalesio.' },
  '014074': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Sondrio.' },
  '014076': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Talamona.' },
  '014078': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Teglio.' },
  '014079': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Tirano.' },
  '014083': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Tresivio.' },
  '014085': { appellation: 'Sforzato di Valtellina', classification: 'DOCG', region: 'Lombardia', color: '#5C2020', grapes: ['Nebbiolo', 'Chiavennasca'], description: 'Sforzato di Valtellina — Villa di Tirano.' },

  // Valtellina Superiore DOCG (same communes, different product)
  '014073': { appellation: 'Valtellina Superiore', classification: 'DOCG', region: 'Lombardia', color: '#6B2020', grapes: ['Nebbiolo'], description: 'Valtellina Superiore — Sernio.' },

  // Oltrepò Pavese Metodo Classico DOCG
  '018003': { appellation: 'Oltrepò Pavese Metodo Classico', classification: 'DOCG', region: 'Lombardia', color: '#D4C87A', grapes: ['Pinot Nero'], description: 'Oltrepò Pavese Metodo Classico — Arena Po.' },
  '018022': { appellation: 'Oltrepò Pavese Metodo Classico', classification: 'DOCG', region: 'Lombardia', color: '#D4C87A', grapes: ['Pinot Nero'], description: 'Oltrepò Pavese Metodo Classico — Broni.' },
  '018037': { appellation: 'Oltrepò Pavese Metodo Classico', classification: 'DOCG', region: 'Lombardia', color: '#D4C87A', grapes: ['Pinot Nero'], description: 'Oltrepò Pavese Metodo Classico — Canneto Pavese.' },
  '018043': { appellation: 'Oltrepò Pavese Metodo Classico', classification: 'DOCG', region: 'Lombardia', color: '#D4C87A', grapes: ['Pinot Nero'], description: 'Oltrepò Pavese Metodo Classico — Castana.' },
  '018119': { appellation: 'Oltrepò Pavese Metodo Classico', classification: 'DOCG', region: 'Lombardia', color: '#D4C87A', grapes: ['Pinot Nero'], description: 'Oltrepò Pavese Metodo Classico — Santa Giuletta.' },
  '018148': { appellation: 'Oltrepò Pavese Metodo Classico', classification: 'DOCG', region: 'Lombardia', color: '#D4C87A', grapes: ['Pinot Nero'], description: 'Oltrepò Pavese Metodo Classico — Stradella.' },
  '018160': { appellation: 'Oltrepò Pavese Metodo Classico', classification: 'DOCG', region: 'Lombardia', color: '#D4C87A', grapes: ['Pinot Nero'], description: 'Oltrepò Pavese Metodo Classico — Torrazza Coste.' },

  // ── TRENTINO-ALTO ADIGE ───────────────────────────────────────────────────────

  // Alto Adige / Südtirol DOC
  '021008': { appellation: 'Alto Adige / Südtirol', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#A8C5A0', grapes: ['Pinot Grigio', 'Gewürztraminer'], description: 'Alto Adige — Bolzano.' },
  '021023': { appellation: 'Alto Adige / Südtirol', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#A8C5A0', grapes: ['Pinot Grigio', 'Gewürztraminer'], description: 'Alto Adige — Caldaro.' },
  '021026': { appellation: 'Alto Adige / Südtirol', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#A8C5A0', grapes: ['Pinot Grigio', 'Gewürztraminer'], description: 'Alto Adige — Castelrotto.' },
  '021052': { appellation: 'Alto Adige / Südtirol', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#A8C5A0', grapes: ['Pinot Grigio', 'Gewürztraminer'], description: 'Alto Adige — Laives.' },
  '021069': { appellation: 'Alto Adige / Südtirol', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#A8C5A0', grapes: ['Pinot Grigio', 'Gewürztraminer'], description: 'Alto Adige — Merano.' },
  '021083': { appellation: 'Alto Adige / Südtirol', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#A8C5A0', grapes: ['Pinot Grigio', 'Gewürztraminer'], description: 'Alto Adige — Ora.' },

  // Trento DOC
  '022205': { appellation: 'Trento DOC', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#B8D4B8', grapes: ['Chardonnay', 'Pinot Nero'], description: 'Trento DOC — Italiës antwoord op Champagne.' },
  '022053': { appellation: 'Trento DOC', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#B8D4B8', grapes: ['Chardonnay', 'Pinot Nero'], description: 'Trento DOC — Lavis.' },
  '022080': { appellation: 'Trento DOC', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#B8D4B8', grapes: ['Chardonnay', 'Pinot Nero'], description: 'Trento DOC — Mezzolombardo.' },
  '022179': { appellation: 'Trento DOC', classification: 'DOC', region: 'Trentino-Alto Adige', color: '#B8D4B8', grapes: ['Chardonnay', 'Pinot Nero'], description: 'Trento DOC — Rovereto.' },

  // ── VENETO ────────────────────────────────────────────────────────────────────

  // Amarone della Valpolicella DOCG
  '023038': { appellation: 'Amarone della Valpolicella', classification: 'DOCG', region: 'Veneto', color: '#1A5C40', grapes: ['Corvina', 'Rondinella', 'Molinara'], description: 'Amarone della Valpolicella — krachtige passitowijn.' },
  '023032': { appellation: 'Amarone della Valpolicella', classification: 'DOCG', region: 'Veneto', color: '#1A5C40', grapes: ['Corvina', 'Rondinella', 'Molinara'], description: 'Amarone della Valpolicella — Fumane.' },
  '023035': { appellation: 'Amarone della Valpolicella', classification: 'DOCG', region: 'Veneto', color: '#1A5C40', grapes: ['Corvina', 'Rondinella', 'Molinara'], description: 'Amarone della Valpolicella — Marano di Valpolicella.' },
  '023049': { appellation: 'Amarone della Valpolicella', classification: 'DOCG', region: 'Veneto', color: '#1A5C40', grapes: ['Corvina', 'Rondinella', 'Molinara'], description: 'Amarone della Valpolicella — Sant\'Ambrogio di Valpolicella.' },
  '023052': { appellation: 'Amarone della Valpolicella', classification: 'DOCG', region: 'Veneto', color: '#1A5C40', grapes: ['Corvina', 'Rondinella', 'Molinara'], description: 'Amarone della Valpolicella — San Pietro in Cariano.' },
  '023021': { appellation: 'Amarone della Valpolicella', classification: 'DOCG', region: 'Veneto', color: '#1A5C40', grapes: ['Corvina', 'Rondinella', 'Molinara'], description: 'Amarone della Valpolicella — Dolcè.' },

  // Soave Superiore DOCG
  '023074': { appellation: 'Soave Superiore', classification: 'DOCG', region: 'Veneto', color: '#F0E070', grapes: ['Garganega'], description: 'Soave Superiore — droge witte wijn van vulkanische bodems.' },
  '023040': { appellation: 'Soave Superiore', classification: 'DOCG', region: 'Veneto', color: '#F0E070', grapes: ['Garganega'], description: 'Soave Superiore — Monteforte d\'Alpone.' },
  '023057': { appellation: 'Soave Superiore', classification: 'DOCG', region: 'Veneto', color: '#F0E070', grapes: ['Garganega'], description: 'Soave Superiore — Caldiero.' },

  // Bardolino Superiore DOCG
  '023009': { appellation: 'Bardolino Superiore', classification: 'DOCG', region: 'Veneto', color: '#E8A0A8', grapes: ['Corvina', 'Rondinella'], description: 'Bardolino Superiore — licht rood aan het Gardameer.' },
  '023007': { appellation: 'Bardolino Superiore', classification: 'DOCG', region: 'Veneto', color: '#E8A0A8', grapes: ['Corvina', 'Rondinella'], description: 'Bardolino Superiore — Affi.' },
  '023025': { appellation: 'Bardolino Superiore', classification: 'DOCG', region: 'Veneto', color: '#E8A0A8', grapes: ['Corvina', 'Rondinella'], description: 'Bardolino Superiore — Garda.' },
  '023027': { appellation: 'Bardolino Superiore', classification: 'DOCG', region: 'Veneto', color: '#E8A0A8', grapes: ['Corvina', 'Rondinella'], description: 'Bardolino Superiore — Lazise.' },
  '023059': { appellation: 'Bardolino Superiore', classification: 'DOCG', region: 'Veneto', color: '#E8A0A8', grapes: ['Corvina', 'Rondinella'], description: 'Bardolino Superiore — Castelnuovo del Garda.' },

  // Conegliano Valdobbiadene Prosecco DOCG
  '026008': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — UNESCO werelderfgoed.' },
  '026087': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Valdobbiadene.' },
  '026031': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Farra di Soligo.' },
  '026019': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Cison di Valmarino.' },
  '026075': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Tarzo.' },
  '026010': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Colle Umberto.' },
  '026044': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Mareno di Piave.' },
  '026051': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Miane.' },
  '026060': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Pieve di Soligo.' },
  '026064': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Refrontolo.' },
  '026068': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — San Pietro di Feletto.' },
  '026070': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — San Vendemiano.' },
  '026077': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Susegana.' },
  '026082': { appellation: 'Conegliano Valdobbiadene Prosecco', classification: 'DOCG', region: 'Veneto', color: '#F5F5A0', grapes: ['Glera'], description: 'Conegliano Valdobbiadene Prosecco — Vittorio Veneto.' },

  // Colli Euganei Fior d'Arancio DOCG
  '028025': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Baone." },
  '028030': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Cinto Euganeo." },
  '028035': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Este." },
  '028038': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Galzignano Terme." },
  '028046': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Lozzo Atestino." },
  '028056': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Monselice." },
  '028058': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Montegrotto Terme." },
  '028062': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Pernumia." },
  '028080': { appellation: "Colli Euganei Fior d'Arancio", classification: 'DOCG', region: 'Veneto', color: '#F8D870', grapes: ['Moscato Giallo'], description: "Colli Euganei Fior d'Arancio — Vo." },

  // Montello DOCG
  '026016': { appellation: 'Montello', classification: 'DOCG', region: 'Veneto', color: '#B87A5A', grapes: ['Merlot', 'Cabernet'], description: 'Montello — Caerano di San Marco.' },
  '026035': { appellation: 'Montello', classification: 'DOCG', region: 'Veneto', color: '#B87A5A', grapes: ['Merlot', 'Cabernet'], description: 'Montello — Giavera del Montello.' },
  '026046': { appellation: 'Montello', classification: 'DOCG', region: 'Veneto', color: '#B87A5A', grapes: ['Merlot', 'Cabernet'], description: 'Montello — Maser.' },
  '026048': { appellation: 'Montello', classification: 'DOCG', region: 'Veneto', color: '#B87A5A', grapes: ['Merlot', 'Cabernet'], description: 'Montello — Montebelluna.' },
  '026067': { appellation: 'Montello', classification: 'DOCG', region: 'Veneto', color: '#B87A5A', grapes: ['Merlot', 'Cabernet'], description: 'Montello — San Zenone degli Ezzelini.' },
  '026076': { appellation: 'Montello', classification: 'DOCG', region: 'Veneto', color: '#B87A5A', grapes: ['Merlot', 'Cabernet'], description: 'Montello — Trevignano.' },

  // Lison DOCG
  '027009': { appellation: 'Lison', classification: 'DOCG', region: 'Veneto', color: '#D4E8B8', grapes: ['Tocai Friulano'], description: 'Lison — Annone Veneto.' },
  '027023': { appellation: 'Lison', classification: 'DOCG', region: 'Veneto', color: '#D4E8B8', grapes: ['Tocai Friulano'], description: 'Lison — Portogruaro.' },
  '027031': { appellation: 'Lison', classification: 'DOCG', region: 'Veneto', color: '#D4E8B8', grapes: ['Tocai Friulano'], description: 'Lison — San Michele al Tagliamento.' },

  // ── FRIULI-VENEZIA GIULIA ─────────────────────────────────────────────────────

  // Colli Orientali del Friuli Picolit DOCG
  '030021': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Buttrio.' },
  '030025': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Cividale del Friuli.' },
  '030030': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Corno di Rosazzo.' },
  '030040': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Faedis.' },
  '030070': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Manzano.' },
  '030078': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Moimacco.' },
  '030083': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Nimis.' },
  '030087': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Premariacco.' },
  '030091': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Remanzacco.' },
  '030105': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — San Giovanni al Natisone.' },
  '030115': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Tarcento.' },
  '030116': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Torreano.' },
  '030122': { appellation: 'Colli Orientali del Friuli Picolit', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#F8E0B0', grapes: ['Picolit'], description: 'Colli Orientali del Friuli Picolit — Trivignano Udinese.' },

  // Ramandolo DOCG
  '030032': { appellation: 'Ramandolo', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#D4A060', grapes: ['Verduzzo Friulano'], description: 'Ramandolo — zeldzame zoete witte wijn.' },

  // Rosazzo DOCG
  // 030030 used for Picolit above; Rosazzo is a sub-zone
  '030031': { appellation: 'Rosazzo', classification: 'DOCG', region: 'Friuli-Venezia Giulia', color: '#C8D4A8', grapes: ['Friulano', 'Ribolla Gialla', 'Malvasia'], description: 'Rosazzo — witte blend van Corno di Rosazzo.' },

  // Collio Goriziano / Collio DOC
  '031004': { appellation: 'Collio Goriziano / Collio', classification: 'DOC', region: 'Friuli-Venezia Giulia', color: '#C8E8B8', grapes: ['Friulano', 'Ribolla Gialla'], description: 'Collio — Cormons.' },
  '031007': { appellation: 'Collio Goriziano / Collio', classification: 'DOC', region: 'Friuli-Venezia Giulia', color: '#C8E8B8', grapes: ['Friulano', 'Ribolla Gialla'], description: 'Collio — Dolegna del Collio.' },
  '031009': { appellation: 'Collio Goriziano / Collio', classification: 'DOC', region: 'Friuli-Venezia Giulia', color: '#C8E8B8', grapes: ['Friulano', 'Ribolla Gialla'], description: 'Collio — Farra d\'Isonzo.' },
  '031011': { appellation: 'Collio Goriziano / Collio', classification: 'DOC', region: 'Friuli-Venezia Giulia', color: '#C8E8B8', grapes: ['Friulano', 'Ribolla Gialla'], description: 'Collio — Gorizia.' },
  '031019': { appellation: 'Collio Goriziano / Collio', classification: 'DOC', region: 'Friuli-Venezia Giulia', color: '#C8E8B8', grapes: ['Friulano', 'Ribolla Gialla'], description: 'Collio — Mossa.' },
  '031023': { appellation: 'Collio Goriziano / Collio', classification: 'DOC', region: 'Friuli-Venezia Giulia', color: '#C8E8B8', grapes: ['Friulano', 'Ribolla Gialla'], description: 'Collio — Romans d\'Isonzo.' },
  '031026': { appellation: 'Collio Goriziano / Collio', classification: 'DOC', region: 'Friuli-Venezia Giulia', color: '#C8E8B8', grapes: ['Friulano', 'Ribolla Gialla'], description: 'Collio — San Floriano del Collio.' },

  // ── EMILIA-ROMAGNA ────────────────────────────────────────────────────────────

  // Albana di Romagna DOCG
  '037006': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Casalfiumanese.' },
  '037024': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Dozza.' },
  '037027': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Fontanelice.' },
  '037037': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Imola.' },
  '037050': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Mordano.' },
  '040009': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Bertinoro.' },
  '040011': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Castrocaro Terme.' },
  '040013': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Cesena.' },
  '040024': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Forlì.' },
  '040028': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Forlimpopoli.' },
  '040048': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Modigliana.' },
  '040051': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Predappio.' },
  '039017': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Brisighella.' },
  '039031': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Casola Valsenio.' },
  '039032': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Castel Bolognese.' },
  '039038': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Faenza.' },
  '039051': { appellation: 'Albana di Romagna', classification: 'DOCG', region: 'Emilia-Romagna', color: '#F0D870', grapes: ['Albana'], description: 'Albana di Romagna — Riolo Terme.' },

  // Colli Bolognesi Pignoletto DOCG
  '037031': { appellation: 'Colli Bolognesi Pignoletto', classification: 'DOCG', region: 'Emilia-Romagna', color: '#E8E8A0', grapes: ['Pignoletto'], description: 'Colli Bolognesi Pignoletto — Grizzana Morandi.' },
  '037034': { appellation: 'Colli Bolognesi Pignoletto', classification: 'DOCG', region: 'Emilia-Romagna', color: '#E8E8A0', grapes: ['Pignoletto'], description: 'Colli Bolognesi Pignoletto — Marzabotto.' },
  '037041': { appellation: 'Colli Bolognesi Pignoletto', classification: 'DOCG', region: 'Emilia-Romagna', color: '#E8E8A0', grapes: ['Pignoletto'], description: 'Colli Bolognesi Pignoletto — Monte San Pietro.' },
  '037046': { appellation: 'Colli Bolognesi Pignoletto', classification: 'DOCG', region: 'Emilia-Romagna', color: '#E8E8A0', grapes: ['Pignoletto'], description: 'Colli Bolognesi Pignoletto — Monterenzio.' },
  '037055': { appellation: 'Colli Bolognesi Pignoletto', classification: 'DOCG', region: 'Emilia-Romagna', color: '#E8E8A0', grapes: ['Pignoletto'], description: 'Colli Bolognesi Pignoletto — Pianoro.' },
  '037064': { appellation: 'Colli Bolognesi Pignoletto', classification: 'DOCG', region: 'Emilia-Romagna', color: '#E8E8A0', grapes: ['Pignoletto'], description: 'Colli Bolognesi Pignoletto — Sasso Marconi.' },

  // ── TOSCANA ───────────────────────────────────────────────────────────────────

  // Brunello di Montalcino DOCG
  '052034': { appellation: 'Brunello di Montalcino', classification: 'DOCG', region: 'Toscana', color: '#4A0E0E', grapes: ['Sangiovese Grosso'], description: 'Brunello di Montalcino — een van Italies grootste rode wijnen.' },

  // Chianti Classico DOCG
  '048021': { appellation: 'Chianti Classico', classification: 'DOCG', region: 'Toscana', color: '#6C2B6C', grapes: ['Sangiovese'], description: 'Chianti Classico — Greve in Chianti.' },
  '052023': { appellation: 'Chianti Classico', classification: 'DOCG', region: 'Toscana', color: '#6C2B6C', grapes: ['Sangiovese'], description: 'Chianti Classico — Radda in Chianti.' },
  '052005': { appellation: 'Chianti Classico', classification: 'DOCG', region: 'Toscana', color: '#6C2B6C', grapes: ['Sangiovese'], description: 'Chianti Classico — Castellina in Chianti.' },
  '052013': { appellation: 'Chianti Classico', classification: 'DOCG', region: 'Toscana', color: '#6C2B6C', grapes: ['Sangiovese'], description: 'Chianti Classico — Gaiole in Chianti.' },
  '052006': { appellation: 'Chianti Classico', classification: 'DOCG', region: 'Toscana', color: '#6C2B6C', grapes: ['Sangiovese'], description: 'Chianti Classico — Castelnuovo Berardenga.' },
  '048040': { appellation: 'Chianti Classico', classification: 'DOCG', region: 'Toscana', color: '#6C2B6C', grapes: ['Sangiovese'], description: 'Chianti Classico — San Casciano in Val di Pesa.' },
  '048006': { appellation: 'Chianti Classico', classification: 'DOCG', region: 'Toscana', color: '#6C2B6C', grapes: ['Sangiovese'], description: 'Chianti Classico — Barberino Tavarnelle.' },

  // Vino Nobile di Montepulciano DOCG
  '052015': { appellation: 'Vino Nobile di Montepulciano', classification: 'DOCG', region: 'Toscana', color: '#5C1A1A', grapes: ['Sangiovese', 'Prugnolo Gentile'], description: 'Vino Nobile di Montepulciano — rijke complexe wijn.' },

  // Vernaccia di San Gimignano DOCG
  '052032': { appellation: 'Vernaccia di San Gimignano', classification: 'DOCG', region: 'Toscana', color: '#E8D870', grapes: ['Vernaccia'], description: 'Vernaccia di San Gimignano — historische witte wijn.' },

  // Morellino di Scansano DOCG
  '053022': { appellation: 'Morellino di Scansano', classification: 'DOCG', region: 'Toscana', color: '#722B2B', grapes: ['Sangiovese'], description: 'Morellino di Scansano — Scansano.' },
  '053001': { appellation: 'Morellino di Scansano', classification: 'DOCG', region: 'Toscana', color: '#722B2B', grapes: ['Sangiovese'], description: 'Morellino di Scansano — Campagnatico.' },
  '053024': { appellation: 'Morellino di Scansano', classification: 'DOCG', region: 'Toscana', color: '#722B2B', grapes: ['Sangiovese'], description: 'Morellino di Scansano — Semproniano.' },
  '053005': { appellation: 'Morellino di Scansano', classification: 'DOCG', region: 'Toscana', color: '#722B2B', grapes: ['Sangiovese'], description: 'Morellino di Scansano — Civitella Paganico.' },
  '053009': { appellation: 'Morellino di Scansano', classification: 'DOCG', region: 'Toscana', color: '#722B2B', grapes: ['Sangiovese'], description: 'Morellino di Scansano — Gavorrano.' },

  // Bolgheri Sassicaia DOCG
  '049018': { appellation: 'Bolgheri Sassicaia', classification: 'DOCG', region: 'Toscana', color: '#1A3A1A', grapes: ['Cabernet Sauvignon', 'Cabernet Franc'], description: 'Bolgheri Sassicaia — Super Toscan icoon.' },

  // Suvereto DOCG
  '049022': { appellation: 'Suvereto', classification: 'DOCG', region: 'Toscana', color: '#2A3A1A', grapes: ['Cabernet Sauvignon', 'Merlot'], description: 'Suvereto — kust-Toscana topwijn.' },

  // Val di Cornia Rosso DOCG
  '049020': { appellation: 'Val di Cornia Rosso', classification: 'DOCG', region: 'Toscana', color: '#3A2A1A', grapes: ['Cabernet Sauvignon', 'Merlot', 'Sangiovese'], description: 'Val di Cornia Rosso — Piombino.' },
  '049013': { appellation: 'Val di Cornia Rosso', classification: 'DOCG', region: 'Toscana', color: '#3A2A1A', grapes: ['Cabernet Sauvignon', 'Merlot', 'Sangiovese'], description: 'Val di Cornia Rosso — Campiglia Marittima.' },

  // Carmignano DOCG
  '100005': { appellation: 'Carmignano', classification: 'DOCG', region: 'Toscana', color: '#8B2020', grapes: ['Sangiovese', 'Cabernet Sauvignon'], description: 'Carmignano — Renaissance wijn met Cabernet.' },
  '100007': { appellation: 'Carmignano', classification: 'DOCG', region: 'Toscana', color: '#8B2020', grapes: ['Sangiovese', 'Cabernet Sauvignon'], description: 'Carmignano — Poggio a Caiano.' },

  // Cortona DOC
  '051018': { appellation: 'Cortona', classification: 'DOC', region: 'Toscana', color: '#7B3020', grapes: ['Syrah'], description: 'Cortona — Syrah in Toscana.' },

  // Montecucco Sangiovese DOCG
  '053026': { appellation: 'Montecucco Sangiovese', classification: 'DOCG', region: 'Toscana', color: '#5A2525', grapes: ['Sangiovese'], description: 'Montecucco Sangiovese — Cinigiano.' },
  '053039': { appellation: 'Montecucco Sangiovese', classification: 'DOCG', region: 'Toscana', color: '#5A2525', grapes: ['Sangiovese'], description: 'Montecucco Sangiovese — Castel del Piano.' },
  '053042': { appellation: 'Montecucco Sangiovese', classification: 'DOCG', region: 'Toscana', color: '#5A2525', grapes: ['Sangiovese'], description: 'Montecucco Sangiovese — Roccastrada.' },
  '053048': { appellation: 'Montecucco Sangiovese', classification: 'DOCG', region: 'Toscana', color: '#5A2525', grapes: ['Sangiovese'], description: 'Montecucco Sangiovese — Arcidosso.' },

  // Maremma Toscana DOC
  '053010': { appellation: 'Maremma Toscana', classification: 'DOC', region: 'Toscana', color: '#8B4545', grapes: ['Sangiovese', 'Cabernet Sauvignon', 'Merlot'], description: 'Maremma Toscana — Grosseto.' },

  // ── MARCHE ────────────────────────────────────────────────────────────────────

  // Conero DOCG
  '042001': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Ancona.' },
  '042010': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Camerano.' },
  '042020': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Camerata Picena.' },
  '042024': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Castelfidardo.' },
  '042032': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Loreto.' },
  '042048': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Numana.' },
  '042056': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Offagna.' },
  '042060': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Osimo.' },
  '042069': { appellation: 'Conero', classification: 'DOCG', region: 'Marche', color: '#5C2020', grapes: ['Montepulciano'], description: 'Conero DOCG — Sirolo.' },

  // Vernaccia di Serrapetrona DOCG
  '043052': { appellation: 'Vernaccia di Serrapetrona', classification: 'DOCG', region: 'Marche', color: '#6B3030', grapes: ['Vernaccia Nera'], description: 'Vernaccia di Serrapetrona — zeldzame mousserende rode wijn.' },

  // Offida DOCG
  '044057': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Offida.' },
  '044030': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Castel di Lama.' },
  '044031': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Castignano.' },
  '044036': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Cossignano.' },
  '044038': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Cupramarittima.' },
  '044044': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Force.' },
  '044052': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Montalto delle Marche.' },
  '044055': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Monterubbiano.' },
  '044060': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Palmiano.' },
  '044065': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Ripatransone.' },
  '044068': { appellation: 'Offida', classification: 'DOCG', region: 'Marche', color: '#C8D0A8', grapes: ['Pecorino', 'Passerina'], description: 'Offida — Rotella.' },

  // ── UMBRIA ────────────────────────────────────────────────────────────────────

  // Torgiano Rosso Riserva DOCG
  '054050': { appellation: 'Torgiano Rosso Riserva', classification: 'DOCG', region: 'Umbria', color: '#7A2828', grapes: ['Sangiovese'], description: 'Torgiano Rosso Riserva — Lungarotti territoir.' },

  // Sagrantino di Montefalco DOCG
  '054034': { appellation: 'Sagrantino di Montefalco', classification: 'DOCG', region: 'Umbria', color: '#4A1A1A', grapes: ['Sagrantino'], description: 'Sagrantino di Montefalco — hoogste tannines in Italië.' },
  '054038': { appellation: 'Sagrantino di Montefalco', classification: 'DOCG', region: 'Umbria', color: '#4A1A1A', grapes: ['Sagrantino'], description: 'Sagrantino di Montefalco — Bevagna.' },
  '054021': { appellation: 'Sagrantino di Montefalco', classification: 'DOCG', region: 'Umbria', color: '#4A1A1A', grapes: ['Sagrantino'], description: 'Sagrantino di Montefalco — Castel Ritaldi.' },
  '054026': { appellation: 'Sagrantino di Montefalco', classification: 'DOCG', region: 'Umbria', color: '#4A1A1A', grapes: ['Sagrantino'], description: 'Sagrantino di Montefalco — Gualdo Cattaneo.' },
  '054051': { appellation: 'Sagrantino di Montefalco', classification: 'DOCG', region: 'Umbria', color: '#4A1A1A', grapes: ['Sagrantino'], description: 'Sagrantino di Montefalco — Trevi.' },

  // ── LAZIO ─────────────────────────────────────────────────────────────────────

  // Est! Est!! Est!!! di Montefiascone DOC
  '056037': { appellation: 'Est! Est!! Est!!! di Montefiascone', classification: 'DOC', region: 'Lazio', color: '#F0E090', grapes: ['Trebbiano', 'Malvasia'], description: 'Est! Est!! Est!!! di Montefiascone — Montefiascone.' },
  '056027': { appellation: 'Est! Est!! Est!!! di Montefiascone', classification: 'DOC', region: 'Lazio', color: '#F0E090', grapes: ['Trebbiano', 'Malvasia'], description: 'Est! Est!! Est!!! di Montefiascone — Bolsena.' },
  '056011': { appellation: 'Est! Est!! Est!!! di Montefiascone', classification: 'DOC', region: 'Lazio', color: '#F0E090', grapes: ['Trebbiano', 'Malvasia'], description: 'Est! Est!! Est!!! di Montefiascone — Gradoli.' },
  '056042': { appellation: 'Est! Est!! Est!!! di Montefiascone', classification: 'DOC', region: 'Lazio', color: '#F0E090', grapes: ['Trebbiano', 'Malvasia'], description: 'Est! Est!! Est!!! di Montefiascone — Onano.' },

  // Frascati Superiore DOCG
  '058037': { appellation: 'Frascati Superiore', classification: 'DOCG', region: 'Lazio', color: '#F5EFC0', grapes: ['Malvasia', 'Trebbiano'], description: 'Frascati Superiore — Castelli Romani klassiek.' },
  '058045': { appellation: 'Frascati Superiore', classification: 'DOCG', region: 'Lazio', color: '#F5EFC0', grapes: ['Malvasia', 'Trebbiano'], description: 'Frascati Superiore — Grottaferrata.' },
  '058049': { appellation: 'Frascati Superiore', classification: 'DOCG', region: 'Lazio', color: '#F5EFC0', grapes: ['Malvasia', 'Trebbiano'], description: 'Frascati Superiore — Montecompatri.' },
  '058108': { appellation: 'Frascati Superiore', classification: 'DOCG', region: 'Lazio', color: '#F5EFC0', grapes: ['Malvasia', 'Trebbiano'], description: 'Frascati Superiore — Monteporzio Catone.' },

  // ── ABRUZZO ───────────────────────────────────────────────────────────────────

  // Montepulciano d'Abruzzo Colline Teramane DOCG
  '067003': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Alba Adriatica." },
  '067006': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Atri." },
  '067009': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Bellante." },
  '067011': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Campli." },
  '067013': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Castellalto." },
  '067017': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Civitella del Tronto." },
  '067021': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Controguerra." },
  '067023': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Corropoli." },
  '067025': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Giulianova." },
  '067033': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Mosciano Sant'Angelo." },
  '067035': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Nereto." },
  '067041': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Notaresco." },
  '067043': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Penna Sant'Andrea." },
  '067046': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Pineto." },
  '067047': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Roseto degli Abruzzi." },
  '067050': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Sant'Egidio alla Vibrata." },
  '067051': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Sant'Omero." },
  '067052': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Silvi." },
  '067054': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Teramo." },
  '067058': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Torano Nuovo." },
  '067060': { appellation: "Montepulciano d'Abruzzo Colline Teramane", classification: 'DOCG', region: 'Abruzzo', color: '#7A2020', grapes: ['Montepulciano'], description: "Montepulciano d'Abruzzo Colline Teramane — Tortoreto." },

  // ── CAMPANIA ──────────────────────────────────────────────────────────────────

  // Taurasi DOCG
  '064088': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Barolo van het Zuiden.' },
  '064001': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Castelfranci.' },
  '064027': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Fontanarosa.' },
  '064039': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Luogosano.' },
  '064040': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Mirabella Eclano.' },
  '064043': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Montemarano.' },
  '064046': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Paternopoli.' },
  '064059': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Pietradefusi.' },
  '064071': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: "Taurasi — Sant'Angelo all'Esca." },
  '064073': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Sorbo Serpico.' },
  '064077': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Torella dei Lombardi.' },
  '064078': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Torre Le Nocelle.' },
  '064081': { appellation: 'Taurasi', classification: 'DOCG', region: 'Campania', color: '#4A1A1A', grapes: ['Aglianico'], description: 'Taurasi — Venticano.' },

  // Fiano di Avellino DOCG
  '064007': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Atripalda.' },
  '064014': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Cesinali.' },
  '064030': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Forino.' },
  '064034': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Lapio.' },
  '064038': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Montefalcione.' },
  '064041': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Montefredane.' },
  '064052': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Parolise.' },
  '064058': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Pietrastornina.' },
  '064060': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — San Potito Ultra.' },
  '064062': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Santa Lucia di Serino.' },
  '064063': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: "Fiano di Avellino — Sant'Angelo a Scala." },
  '064065': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Santo Stefano del Sole.' },
  '064068': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Serino.' },
  '064083': { appellation: 'Fiano di Avellino', classification: 'DOCG', region: 'Campania', color: '#F0E8B0', grapes: ['Fiano'], description: 'Fiano di Avellino — Summonte.' },

  // Greco di Tufo DOCG
  '064009': { appellation: 'Greco di Tufo', classification: 'DOCG', region: 'Campania', color: '#F8E870', grapes: ['Greco'], description: 'Greco di Tufo — Altavilla Irpina.' },
  '064018': { appellation: 'Greco di Tufo', classification: 'DOCG', region: 'Campania', color: '#F8E870', grapes: ['Greco'], description: 'Greco di Tufo — Chianche.' },
  '064028': { appellation: 'Greco di Tufo', classification: 'DOCG', region: 'Campania', color: '#F8E870', grapes: ['Greco'], description: 'Greco di Tufo — Gesualdo.' },
  '064053': { appellation: 'Greco di Tufo', classification: 'DOCG', region: 'Campania', color: '#F8E870', grapes: ['Greco'], description: 'Greco di Tufo — Prata di Principato Ultra.' },
  '064057': { appellation: 'Greco di Tufo', classification: 'DOCG', region: 'Campania', color: '#F8E870', grapes: ['Greco'], description: 'Greco di Tufo — Pratola Serra.' },
  '064091': { appellation: 'Greco di Tufo', classification: 'DOCG', region: 'Campania', color: '#F8E870', grapes: ['Greco'], description: 'Greco di Tufo — Tufo.' },
  '064090': { appellation: 'Greco di Tufo', classification: 'DOCG', region: 'Campania', color: '#F8E870', grapes: ['Greco'], description: 'Greco di Tufo — Torrioni.' },

  // Aglianico del Taburno DOCG
  '062006': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Apollosa.' },
  '062011': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Bonea.' },
  '062019': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Campoli del Monte Taburno.' },
  '062024': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Castelpoto.' },
  '062031': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Foglianise.' },
  '062053': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Montesarchio.' },
  '062054': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Paupisi.' },
  '062056': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Ponte.' },
  '062059': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: "Aglianico del Taburno — Sant'Agata de' Goti." },
  '062061': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Tocco Caudio.' },
  '062066': { appellation: 'Aglianico del Taburno', classification: 'DOCG', region: 'Campania', color: '#5A1A1A', grapes: ['Aglianico'], description: 'Aglianico del Taburno — Torrecuso.' },

  // ── BASILICATA ────────────────────────────────────────────────────────────────

  // Aglianico del Vulture Superiore DOCG
  '076001': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Acerenza.' },
  '076006': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Atella.' },
  '076010': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Barile.' },
  '076016': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Forenza.' },
  '076022': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Ginestra.' },
  '076025': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Maschito.' },
  '076040': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Melfi.' },
  '076045': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Montemilone.' },
  '076049': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Palazzo San Gervasio.' },
  '076060': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Rapolla.' },
  '076061': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Rionero in Vulture.' },
  '076062': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Ripacandida.' },
  '076068': { appellation: 'Aglianico del Vulture Superiore', classification: 'DOCG', region: 'Basilicata', color: '#3A1A3A', grapes: ['Aglianico'], description: 'Aglianico del Vulture Superiore — Venosa.' },

  // ── SICILIA ───────────────────────────────────────────────────────────────────

  // Cerasuolo di Vittoria DOCG
  '088001': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: "Cerasuolo di Vittoria — Acate. Nero d'Avola en Frappato." },
  '088002': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Chiaramonte Gulfi.' },
  '088003': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Comiso.' },
  '085017': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Gela.' },
  '085004': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Butera.' },
  '088005': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Monterosso Almo.' },
  '088006': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Ragusa.' },
  '088007': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Santa Croce Camerina.' },
  '088008': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Vittoria.' },
  '087012': { appellation: 'Cerasuolo di Vittoria', classification: 'DOCG', region: 'Sicilia', color: '#C0403A', grapes: ["Nero d'Avola", 'Frappato'], description: 'Cerasuolo di Vittoria — Caltagirone.' },

  // Etna DOC
  '087010': { appellation: 'Etna', classification: 'DOC', region: 'Sicilia', color: '#8B3A2A', grapes: ['Nerello Mascalese', 'Carricante'], description: 'Etna DOC — Biancavilla. Vulkanische wijnen van de Etna.' },
  '087017': { appellation: 'Etna', classification: 'DOC', region: 'Sicilia', color: '#8B3A2A', grapes: ['Nerello Mascalese', 'Carricante'], description: 'Etna DOC — Castiglione di Sicilia.' },
  '087042': { appellation: 'Etna', classification: 'DOC', region: 'Sicilia', color: '#8B3A2A', grapes: ['Nerello Mascalese', 'Carricante'], description: 'Etna DOC — Milo.' },
  '087050': { appellation: 'Etna', classification: 'DOC', region: 'Sicilia', color: '#8B3A2A', grapes: ['Nerello Mascalese', 'Carricante'], description: "Etna DOC — Sant'Alfio." },
  '087053': { appellation: 'Etna', classification: 'DOC', region: 'Sicilia', color: '#8B3A2A', grapes: ['Nerello Mascalese', 'Carricante'], description: 'Etna DOC — Santa Venerina.' },
  '087057': { appellation: 'Etna', classification: 'DOC', region: 'Sicilia', color: '#8B3A2A', grapes: ['Nerello Mascalese', 'Carricante'], description: 'Etna DOC — Zafferana Etnea.' },

  // ── SARDEGNA ──────────────────────────────────────────────────────────────────

  // Vermentino di Gallura DOCG
  '090007': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Aggius.' },
  '090016': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Berchidda.' },
  '090023': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Bortigiadas.' },
  '090028': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Calangianus.' },
  '090030': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Loiri Porto San Paolo.' },
  '090038': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Monti.' },
  '090039': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Olbia.' },
  '090047': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Palau.' },
  '090051': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Santa Teresa Gallura.' },
  '090054': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Tempio Pausania.' },
  '090056': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Telti.' },
  '090060': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Luras.' },
  '090015': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: 'Vermentino di Gallura — Buddusò.' },
  '090008': { appellation: 'Vermentino di Gallura', classification: 'DOCG', region: 'Sardegna', color: '#E8F0A0', grapes: ['Vermentino'], description: "Vermentino di Gallura — Alà dei Sardi." },

};

/**
 * Return the fill color for a given ISTAT municipality code, or null if unknown.
 * @param {string} istatCode - 6-digit ISTAT code
 * @returns {string|null}
 */
export function getZoneColor(istatCode) {
  return ITALY_WINE_ZONES[istatCode]?.color || null;
}

/**
 * Return all ISTAT codes for a given appellation name (case-insensitive).
 * @param {string} name - appellation name
 * @returns {string[]}
 */
export function getMunicipalitiesForAppellation(name) {
  return Object.entries(ITALY_WINE_ZONES)
    .filter(([, v]) => v.appellation.toLowerCase() === name.toLowerCase())
    .map(([k]) => k);
}
