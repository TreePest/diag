// Variables nécessaires
const API_KEY = 'AIzaSyCf4B0VxrrvRgkRS7JECLU9BJm3LxyCbDc'; // Remplace par ta clé API
const SPREADSHEET_ID = '1XmDnub3MfsAVfVlIAqrRKB1yBVEEx3iluG-Qsxq5Eds'; // L'ID de ta feuille Google Sheets
const RANGE = 'bddurl!A3:AN113'; // La plage que tu veux lire (par exemple : 'Sheet1!A1:C10')

// URL de l'API Google Sheets
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

// Fonction pour récupérer les données
async function getSheetData() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    if (data.values) {
      console.log('Données récupérées :', data.values);
    } else {
      console.log('Pas de données renvoyées :', data);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

// Appel de la fonction pour récupérer les données
getSheetData();




  // Définir les valeurs associées aux options
  var filterConfig = {
    'hote': {
      'Arecacée (Palmiers)': ['areca', 'aréca', 'phoenix', 'angiosperm', 'monocot', 'plante'],
      'Betulacée (Alnus, Carpinus ...)': ['alnus', 'betula', 'carpinus', 'corylus', 'ostrya', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Buxacée (Buis)': ['bux', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Fabacée (Robinia, Cercis ...)': ['acacia', 'cercis', 'fabac', 'gleditzia', 'robinia', 'sophora', 'wisteria', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Fagacée (Quercus, Castanea ...)': ['castanea', 'fagus', 'fagac', 'quercus', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Juglandacée (Juglans, Carya ...)': ['juglan', 'carya', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Magnoliacée (Liriodendron ...)': ['magnolia', 'liriodendron', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Malvacée (Tilia, Hibiscus ...)': ['tilia', 'malva', 'hibiscus', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Oleacée (Fraxinus, Syringa ...)': ['olea', 'fraxinus', 'forsythia', 'syringa', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Platanacée (Platanes)': ['platan', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Rosacée (Prunus, Crataegus ...)': ['crataegus', 'malus', 'prunus', 'pyrus', 'rosa', 'sorbus', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Rutacée (Citrus, Choisya ...)': ['citrus', 'ruta', 'agrum', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Salicaceae (Populus, Salix ...)': ['populus', 'salica', 'salix', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Sapindacée (Acer, Aesculus ...)': ['acer', 'aesculus', 'koelreu', 'sapinda', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Ulmacée (Ulmus, Zelkova ...)': ['ulm', 'zelkova', 'angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Autre feuillu': ['angiosperm', 'dicot', 'feuillu', 'ligneu', 'plante'],
      'Cupressacée (Sequoia, Thuja ...)': ['cupress', 'calocedr', 'chamae', 'juniper', 'thuj', 'sequoia', 'cryptomeria', 'taxodium', 'conif', 'gymno', 'ligneu', 'plante'],
      'Ginkgoacée (Ginkgo biloba)': ['ginkgo', 'gymno', 'ligneu', 'plante'],
      'Pinacée (Abies, Cedrus ...)': ['abies', 'cedrus', 'tsuga', 'larix', 'picea', 'pinus', 'pinac', 'conif', 'gymno', 'ligneu', 'plante'],
      'Taxacée (Taxus ...)': ['taxus', 'taxa', 'conif', 'gymno', 'ligneu', 'plante'],
      'Autre conifère': ['conif', 'gymno', 'ligneu', 'plante']
    },
    'symptome': {
      'Écoulement': ['écoul', 'ecoul', 'suint', 'exsudat', 'liquide'],
      'Décollement décorce': ['décoll', 'ecoul', 'cambium'],
      'Fissure, chancre, nécrose': ['fissur', 'chancre', 'necro', 'nécro', 'plaie'],
      'Cavité': ['resonn', 'résonn', 'creuse', 'creux', 'cavite', 'cavité'],
      'Galle, déformations ...': ['déform', 'deform', 'courb', 'boursoufl', 'enroul', 'gondol', 'galle'],
      'Chlorose, tâche ...': ['chlorose', 'tache', 'point', 'trou', 'perfor', 'décolor', 'decolor', 'jauni'],
      'Dessèchement': ['fletr', 'flétr', 'sech', 'séch', 'sèch'],
      'Faible vigueur': ['vigueur', 'photosynth'],
      'Dépérissement': ['dépér', 'deper', 'mort', 'scente de cime']
    },
    'taxon': {
      'Animal': ['animal'],
      'Arthropode': ['arthropode'],
      'Acarien': ['arachnida'],
      'Insecte': ['insecta'],
      'Coléoptère': ['coleoptera'],
      'Hémiptère': ['hemiptera'],
      'Hyménoptère': ['hymenoptera'],
      'Lépidoptère': ['lepidoptera'],
      'Nématode': ['nématode', 'nematode'],
      'Vertébré': ['vertébré', 'vertebre'],
      'Champignon': ['champignon'],
      'Ascomycète': ['ascomycète', 'ascomycete'],
      'Basidiomycète': ['basidiomycète', 'basidiomycete'],
      'Pseudo-champignon': ['pseudo-champignon'],
      'Plante': ['plante'],
      'Bactérie': ['bacterie', 'bactérie'],
      'Virus': ['virus'],
      'Abiotique': ['abiotique']
    },
    'zone': {
      'Racine': ['racine'],
      'Collet': ['collet'],
      'Tronc': ['tronc'],
      'Houppier': ['houppier']
    },
    'structure': {
      'Bois': ['moelle', 'rayons', 'lignine', 'cellulose', 'vaisseaux', 'cambium'],
      'Écorce': ['ecorce', 'écorce', 'cambium'],
      'Tiges': ['tiges'],
      'Feuilles': ['feuilles'],
      'Fleurs': ['fleurs'],
      'Fruits': ['fruits']
    },
    'forme': {
      'Stipité': ['stipité', 'stipite'],
      'Console': ['console'],
      'Résupiné': ['resupiné', 'resupine']
    },
    'agencement': {
      'Isolé': ['isolé', 'isole'],
      'Cespiteux': ['cespiteux'],
      'Empilés': ['empilés', 'empiles']
    },
    'hymenium': {
      'Pore ou tube': ['pore', 'tube'],
      'Lame': ['lame'],
      'Lisse': ['lisse']
    },
    'perennite': {
      'Annuel': ['annuel'],
      'Pérenne': ['pérenne', 'perenne']
    },
    'cuticule_couleur': {
      'Clair': ['clair', 'blanc', 'crème', 'creme', 'pale', 'gris', 'beige'],
      'Foncé': ['foncé', 'fonce', 'noir', 'marron', 'brun'],
      'Coloré': ['color', 'jaun', 'roug', 'violet', 'bleu', 'ocre', 'pourpre', 'ver', 'orang', 'mauv']
    },
    'hymenium_couleur': {
      'Clair': ['clair', 'blanc', 'crème', 'creme', 'pale', 'gris', 'beige'],
      'Foncé': ['foncé', 'fonce', 'noir', 'marron', 'brun'],
      'Coloré': ['color', 'jaun', 'roug', 'violet', 'bleu', 'ocre', 'pourpre', 'ver', 'orang', 'mauv']
    },
    'chair_couleur': {
      'Clair': ['clair', 'blanc', 'crème', 'creme', 'pale', 'gris', 'beige'],
      'Foncé': ['foncé', 'fonce', 'noir', 'marron', 'brun'],
      'Coloré': ['color', 'jaun', 'roug', 'violet', 'bleu', 'ocre', 'pourpre', 'ver', 'orang', 'mauv']
    },
  };

  // Vérifie si les options sont définies, sinon les initialise à des tableaux vides
  nomOptions = nomOptions || [];
  taxonOptions = taxonOptions || [];
  hoteOptions = hoteOptions || [];
  structureOptions = structureOptions || [];
  zoneOptions = zoneOptions || [];
  symptomeOptions = symptomeOptions || [];
  formeOptions = formeOptions || [];
  agencementOptions = agencementOptions || [];
  hymeniumOptions = hymeniumOptions || [];
  perenniteOptions = perenniteOptions || [];
  tailleOptions = tailleOptions || null;
  cuticule_couleurOptions = cuticule_couleurOptions || [];
  hymenium_couleurOptions = hymenium_couleurOptions || [];
  chair_couleurOptions = chair_couleurOptions || [];

  console.log('Nom Options:', nomOptions);
  console.log('Taxon Options:', taxonOptions);
  console.log('Hote Options:', hoteOptions);
  console.log('Structure Options:', structureOptions);
  console.log('Zone Options:', zoneOptions);
  console.log('Symptome Options:', symptomeOptions);
  console.log('Forme Options:', formeOptions);
  console.log('Agencement Options:', agencementOptions);
  console.log('Hymenium Options:', hymeniumOptions);
  console.log('Pérennité Options:', perenniteOptions);
  console.log('Taille Options:', tailleOptions);
  console.log('Couleur de la cuticule Options:', cuticule_couleurOptions);
  console.log('Couleur de l\'hyménium Options:', hymenium_couleurOptions);
  console.log('Couleur de la chair Options:', chair_couleurOptions);

  function containsAny(cellValue, values) {
    return values && values.length > 0 && values.some(value => cellValue.toLowerCase().includes(value.toLowerCase().trim()));
  }

  function checkRow(row) {
    try {
      console.log('Row data:', row);

      // Vérification du filtre "Nom"
      let nomMatch = true;
      if (typeof nomOptions === 'string' && nomOptions.trim().length > 0) {
          // Si nomOptions est une chaîne de caractères, vérifier si "Nom" ou "Nom 2" contient le texte saisi
          nomMatch = (row[0] && row[0].toLowerCase().includes(nomOptions.toLowerCase().trim())) ||
                     (row[1] && row[1].toLowerCase().includes(nomOptions.toLowerCase().trim())) ||
                     (row[2] && row[2].toLowerCase().includes(nomOptions.toLowerCase().trim())) ||
                     (row[3] && row[3].toLowerCase().includes(nomOptions.toLowerCase().trim()));
      } else if (Array.isArray(nomOptions) && nomOptions.length > 0) {
          // Si nomOptions est un tableau, vérifier si l'une des options correspond exactement à "Nom" ou "Nom 2"
          nomMatch = nomOptions.some(option => 
              (row[0] && row[0].toLowerCase() === option.toLowerCase()) || 
              (row[1] && row[1].toLowerCase() === option.toLowerCase()) || 
              (row[2] && row[2].toLowerCase() === option.toLowerCase()) || 
              (row[3] && row[3].toLowerCase() === option.toLowerCase())
          );
      }

      // Vérification du filtre "Taxon"
      var taxonMatch = taxonOptions.length === 0 || taxonOptions.every(option => {
          var values = filterConfig['taxon'][option];
          console.log('Taxon values:', values);
          return values && values.length > 0 && 
              (containsAny(row[33], values) || containsAny(row[34], values) || containsAny(row[35], values) || containsAny(row[36], values) || containsAny(row[37], values));
      });

      // Vérification du filtre "Hôte"
      var hoteMatch = hoteOptions.length === 0 || hoteOptions.every(option => {
          var values = filterConfig['hote'][option];
          console.log('Hote values:', values);
          return values && values.length > 0 && containsAny(row[9], values);
      });

      // Vérification du filtre "Structure"
      var structureMatch = structureOptions.length === 0 || structureOptions.every(option => {
          var values = filterConfig['structure'][option];
          console.log('Structure values:', values);
          return values && values.length > 0 && containsAny(row[11], values);
      });

      // Vérification du filtre "Zone"
      var zoneMatch = zoneOptions.length === 0 || zoneOptions.every(option => {
          var values = filterConfig['zone'][option];
          console.log('Zone values:', values);
          return values && values.length > 0 && containsAny(row[10], values);
      });

      // Vérification du filtre "Symptôme"
      var symptomeMatch = symptomeOptions.length === 0 || symptomeOptions.every(option => {
          var values = filterConfig['symptome'][option];
          console.log('Symptome values:', values);
          return values && values.length > 0 && 
              (containsAny(row[12], values) || containsAny(row[13], values) || containsAny(row[39], values));
      });

      // Vérification du filtre "Forme"
      var formeMatch = formeOptions.length === 0 || formeOptions.every(option => {
          var values = filterConfig['forme'][option];
          console.log('Forme values:', values);
          return values && values.length > 0 && containsAny(row[15], values);
      });

      // Vérification du filtre "Agencement"
      var agencementMatch = agencementOptions.length === 0 || agencementOptions.every(option => {
          var values = filterConfig['agencement'][option];
          console.log('Agencement values:', values);
          return values && values.length > 0 && containsAny(row[19], values);
      });

      // Vérification du filtre "Hymenium"
      var hymeniumMatch = hymeniumOptions.length === 0 || hymeniumOptions.every(option => {
          var values = filterConfig['hymenium'][option];
          console.log('Hymenium values:', values);
          return values && values.length > 0 && containsAny(row[20], values);
      });

      // Vérification du filtre "Perennité"
      var perenniteMatch = perenniteOptions.length === 0 || perenniteOptions.every(option => {
          var values = filterConfig['perennite'][option];
          console.log('Perennité values:', values);
          return values && values.length > 0 && containsAny(row[14], values);
      });

      // Vérification du filtre "Taille"
      var tailleValeur = parseInt(row[18], 10); // Assurez-vous que tailleValeur est bien un nombre
      console.log('Row Taille:', row[18]);
      console.log('Parsed Taille:', tailleValeur);
      var tailleMatch = (tailleOptions === null || tailleOptions === undefined) || (tailleValeur && tailleValeur >= tailleOptions);

      // Vérification du filtre "Couleur de la Cuticule"
      var cuticule_couleurMatch = cuticule_couleurOptions.length === 0 || cuticule_couleurOptions.every(option => {
          var values = filterConfig['cuticule_couleur'][option];
          console.log('Couleur de la Cuticule values:', values);
          return values && values.length > 0 && containsAny(row[21], values);
      });

      // Vérification du filtre "Couleur de l'Hyménium"
      var hymenium_couleurMatch = hymenium_couleurOptions.length === 0 || hymenium_couleurOptions.every(option => {
          var values = filterConfig['hymenium_couleur'][option];
          console.log('Couleur de l\'Hyménium values:', values);
          return values && values.length > 0 && containsAny(row[22], values);
      });

      // Vérification du filtre "Couleur de la Chair"
      var chair_couleurMatch = chair_couleurOptions.length === 0 || chair_couleurOptions.every(option => {
          var values = filterConfig['chair_couleur'][option];
          console.log('Couleur de la Chair values:', values);
          return values && values.length > 0 && containsAny(row[23], values);
      });


      console.log('nomMatch:', nomMatch);
      console.log('taxonMatch:', taxonMatch);
      console.log('hoteMatch:', hoteMatch);
      console.log('structureMatch:', structureMatch);
      console.log('zoneMatch:', zoneMatch);
      console.log('symptomeMatch:', symptomeMatch);
      console.log('formeMatch:', formeMatch);
      console.log('agencementMatch:', agencementMatch);
      console.log('hymeniumMatch:', hymeniumMatch);
      console.log('perenniteMatch:', perenniteMatch);
      console.log('tailleMatch:', tailleMatch);
      console.log('cuticule_couleurMatch:', cuticule_couleurMatch);
      console.log('hymenium_couleurMatch:', hymenium_couleurMatch);
      console.log('chair_couleurMatch:', chair_couleurMatch);

      return nomMatch && taxonMatch && hoteMatch && structureMatch && zoneMatch && symptomeMatch && formeMatch && agencementMatch && hymeniumMatch && perenniteMatch && tailleMatch && cuticule_couleurMatch && hymenium_couleurMatch && chair_couleurMatch;
    } catch (error) {
    console.error('Error processing row:', error);
    }
  }

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    if (checkRow(row)) {
      filteredData.push(row);
    }
  }

  console.log('Filtered Data:', filteredData);
  return filteredData;
}
