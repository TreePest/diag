// Variables nécessaires
const API_KEY = 'AIzaSyCf4B0VxrrvRgkRS7JECLU9BJm3LxyCbDc'; // Remplace par ta clé API
const SPREADSHEET_ID = '1XmDnub3MfsAVfVlIAqrRKB1yBVEEx3iluG-Qsxq5Eds'; // L'ID de ta feuille Google Sheets
const RANGE = 'bddurl!A3:AN113'; // La plage que tu veux lire (par exemple : 'Sheet1!A1:C10')

// URL de l'API Google Sheets
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

// Variable pour stocker les données
let allData = [];

// Fonction pour récupérer les données
async function getSheetData() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    if (data.values) {
      allData = data.values; // Stocker les données dans la variable globale
      console.log('Données récupérées :', data.values);
      applyFilters(); // Appliquer les filtres après avoir chargé les données
    } else {
      console.log('Pas de données renvoyées :', data);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}

// Appel de la fonction pour récupérer les données
getSheetData();

function applyFilters() {
      var nom = document.getElementById('nomInput').value.toLowerCase();
			var taxon = Array.from(document.querySelectorAll('#taxon input[type="checkbox"]:checked')).map(el => el.value);
			var hote = Array.from(document.querySelectorAll('#hote input[type="checkbox"]:checked')).map(el => el.value);
			var structure = Array.from(document.querySelectorAll('#structure input[type="checkbox"]:checked')).map(el => el.value);
			var zone = Array.from(document.querySelectorAll('#zone input[type="checkbox"]:checked')).map(el => el.value);
			var symptome = Array.from(document.querySelectorAll('#symptome input[type="checkbox"]:checked')).map(el => el.value);
			var forme = Array.from(document.querySelectorAll('#forme input[type="checkbox"]:checked')).map(el => el.value);
			var agencement = Array.from(document.querySelectorAll('#agencement input[type="checkbox"]:checked')).map(el => el.value);
			var hymenium = Array.from(document.querySelectorAll('#hymenium input[type="checkbox"]:checked')).map(el => el.value);
			var perennite = Array.from(document.querySelectorAll('#perennite input[type="checkbox"]:checked')).map(el => el.value);
			var taille = parseInt(document.getElementById('tailleInput').value, 10); // Récupérer la valeur numérique
			var cuticule_couleur = Array.from(document.querySelectorAll('#cuticule_couleur input[type="checkbox"]:checked')).map(el => el.value);
			var hymenium_couleur = Array.from(document.querySelectorAll('#hymenium_couleur input[type="checkbox"]:checked')).map(el => el.value);
			var chair_couleur = Array.from(document.querySelectorAll('#chair_couleur input[type="checkbox"]:checked')).map(el => el.value);

			// Mettre à jour les boutons de filtre
			updateFilterButtons('nom', nom ? [nom] : []);
			updateFilterButtons('taxon', taxon);
			updateFilterButtons('hote', hote);
			updateFilterButtons('structure', structure);
			updateFilterButtons('zone', zone);
			updateFilterButtons('symptome', symptome);
			updateFilterButtons('forme', forme);
			updateFilterButtons('agencement', agencement);
			updateFilterButtons('hymenium', hymenium);
			updateFilterButtons('perennite', perennite);
			updateFilterButtons('taille', taille ? [taille] : []);
			updateFilterButtons('cuticule_couleur', cuticule_couleur);
			updateFilterButtons('hymenium_couleur', hymenium_couleur);
			updateFilterButtons('chair_couleur', chair_couleur);

      // Appeler le script Google Apps Script pour filtrer les données
      google.script.run.withSuccessHandler(function(data) {
        console.log(data);
        var resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Effacer les résultats précédents

        if (data.length === 0) {
          resultsDiv.innerHTML = 'Aucun résultat trouvé.';
        } else {
          data.forEach(function(row) {
        // Créez une structure HTML pour chaque ligne de résultat
        var resultHTML = `
            <div class="result-item">
                <div class="result-nom">${row[0]}</div>
                <div class="result-nomlat">${row[1]} ${row[2]}</div>
                <div class="result-synonyme-famille">
                    <div class="result-synonyme"><b>Synonymes : </b><i>${row[3]}</i></div>
                    <div class="result-famille"><b>Famille : </b><i>${row[37]}</i></div>
                </div>
                <div class="result-illustrations">
                    <div class="image-wrapper"><img src="${row[4]}" alt="Illustration"/></div>
                    <div class="image-wrapper"><img src="${row[5]}" alt="Illustration"/></div>
                    <div class="image-wrapper"><img src="${row[6]}" alt="Illustration"/></div>
                    <div class="image-wrapper"><img src="${row[7]}" alt="Illustration"/></div>
                </div>
            </div>
        `;
        // Insérer le HTML dans le conteneur de résultats
        resultsDiv.innerHTML += resultHTML;
        });
        }
      }).filterData(nom, taxon, hote, structure, zone, symptome, forme, agencement, hymenium, perennite, taille, cuticule_couleur, hymenium_couleur, chair_couleur);
    }


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


document.addEventListener('DOMContentLoaded', function() {
      // Afficher les résultats dès le chargement de la page
      applyFilters();
    });

    document.getElementById('tailleInput').addEventListener('input', function() {
      applyFilters(); // Appelle la fonction de filtrage chaque fois que la valeur change
    });

    // Fonction pour basculer l'affichage des dropdowns
    function toggleDropdown(id) {
      // Fermer les autres dropdowns avant d'ouvrir celui sélectionné
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].id !== id) {
          dropdowns[i].classList.remove('show');
        }
      }

      // Ouvrir/Fermer le dropdown sélectionné
      document.getElementById(id).classList.toggle("show");
    }

    // Fermer le dropdown si l'utilisateur clique en dehors
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown-content') && !event.target.matches('.dropdown-content *')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      const singleSelectDropdowns = document.querySelectorAll('.dropdown[data-single-select="true"]');
  
      singleSelectDropdowns.forEach(function(dropdown) {
        const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
    
        checkboxes.forEach(function(checkbox) {
          checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
              checkboxes.forEach(function(otherCheckbox) {
                if (otherCheckbox !== checkbox) {
                  otherCheckbox.checked = false; // Désélectionne les autres cases
                }
              });
            }
            // Appelle applyFilters pour mettre à jour les filtres après chaque changement
            applyFilters();
          });
        });
      });
    });
	  

    // Fonction pour mettre à jour les boutons de filtre
    function updateFilterButtons(filterType, selectedValues) {
      var container = document.getElementById('filterButtonsContainer');

      // Supprimer les anciens boutons pour ce type de filtre
      var oldButtons = container.querySelectorAll('.filter-button[data-filter="' + filterType + '"]');
      oldButtons.forEach(button => container.removeChild(button));

      // Définir un libellé pour chaque type de filtre
      var filterLabels = {
        'nom': 'Nom',
        'taxon': 'Taxon',
        'hote': 'Hôte',
        'structure': 'Structure affectée',
        'zone': 'Zone affectée',
        'symptome': 'Symptôme',
        'forme': 'Forme du sporophore',
        'agencement': 'Agencement des sporophores',
        'hymenium': 'Structure de l\'hyménium',
        'perennite': 'Pérennité du sporophore',
        'taille': 'Taille du sporophore (cm)',
        'cuticule_couleur': 'Couleur de la cuticule',
        'hymenium_couleur': 'Couleur de l\'hyménium',
        'chair_couleur': 'Couleur de la chair'
      };

      // Ajouter les nouveaux boutons pour les filtres actifs
      selectedValues.forEach(value => {
        var button = document.createElement('div');
        button.className = 'filter-button';
        button.dataset.filter = filterType;
        button.dataset.value = value;
        button.innerHTML = filterLabels[filterType] + ' : ' + value + ' <span>&times;</span>';
        button.onclick = function() {
          removeFilter(filterType, value);
        };
        container.appendChild(button);
      });
    }

    // Fonction pour retirer un filtre spécifique
    function removeFilter(filterType, value) {
      if (filterType === 'nom') {
        document.getElementById('nomInput').value = '';
      } else if (filterType === 'taille') {
          document.getElementById('tailleInput').value = '';
      } else {
        var checkbox = document.querySelector('#' + filterType + ' input[type="checkbox"][value="' + value + '"]');
        if (checkbox) {
          checkbox.checked = false;
        }
      }

      // Réappliquer les filtres
      applyFilters();
    }

    // Fonction pour réinitialiser tous les filtres
    function resetFilters() {
      document.getElementById('nomInput').value = '';
      document.getElementById('tailleInput').value = '';

      var checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });


      // Vider le conteneur des boutons de filtre
      document.getElementById('filterButtonsContainer').innerHTML = '';

      applyFilters(); // Réappliquer les filtres après la réinitialisation
    }
