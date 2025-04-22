const API_KEY = 'AIzaSyCf4B0VxrrvRgkRS7JECLU9BJm3LxyCbDc';
const SPREADSHEET_ID = '1XmDnub3MfsAVfVlIAqrRKB1yBVEEx3iluG-Qsxq5Eds';
const RANGE = 'bdd!A3:AR207';

const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

// Récupérer l'index de la ligne à partir de l'URL
const params = new URLSearchParams(window.location.search);
const especeParam = params.get('espece'); // ex : "Inonotus_hispidus"

// Récupérer les données depuis Local Storage
let allData = [];

fetch(URL)
  .then(response => response.json())
  .then(data => {
    allData = data.values;
    afficherDetails(); // on appelle une fonction une fois les données chargées
  })
  .catch(error => {
    console.error("Erreur de chargement de la BDD :", error);
    detailsContainer.innerHTML = "<p>Erreur de chargement des données.</p>";
  });

// Récupérer l'élément où afficher les détails
const detailsContainer = document.getElementById('result-details');

function afficherDetails() {
  if (!especeParam) {
    detailsContainer.innerHTML = "<p>Espèce non spécifiée dans l'URL.</p>";
    return;
  }

  const [genreURL, especeURL] = especeParam.split("_");

  // Chercher la ligne dans allData qui correspond au genre + espèce
  const row = allData.find(r => 
    r[1].toLowerCase() === genreURL.toLowerCase() &&
    r[2].toLowerCase() === especeURL.toLowerCase()
  );

  if (!row) {
    detailsContainer.innerHTML = `<p>Espèce "${especeParam}" non trouvée dans la base de données.</p>`;
    return;
  }

    // Modifier dynamiquement le titre de l'onglet avec le nom latin
    document.title = `${row[1]} ${row[2]} - TreePestDiag Fiche espèce`;

    // Modifier dynamiquement le titre h1
    document.getElementById('result-title').innerHTML = `
        <div>${row[0]}</div>
        <div><i>${row[1]} ${row[2]}</i></div>
    `;

    // Construire dynamiquement le contenu HTML
let descriptionContent = `
  <h3>Description</h3>
  <p><strong>Partie visible du parasite :</strong> ${row[13]}</p>
`;

// Afficher les infos sur les sporophores uniquement si la taille est renseignée
if (row[18] && row[18].trim() !== '') {
  descriptionContent += `
    <p><strong>Pérennité du sporophore :</strong> ${row[14]}</p>
    <p><strong>Forme du chapeau :</strong> ${row[15]}</p>
    <p><strong>Anneau :</strong> ${row[17]}</p>
    <p><strong>Taille maximum du sporophore :</strong> ${row[18]}</p>
    <p><strong>Agencement des sporophores :</strong> ${row[19]}</p>
    <p><strong>Structure de l'hyménium :</strong> ${row[20]}</p>
    <p><strong>Couleur de la cuticule :</strong> ${row[21]}</p>
    <p><strong>Couleur de l'hyménium :</strong> ${row[22]}</p>
    <p><strong>Couleur de la chair :</strong> ${row[23]}</p>
  `;
}

// Ajouter les images à la suite
descriptionContent += `
  <p>
    <img src="${row[5]}" alt="Illustration"/>
    <img src="${row[6]}" alt="Illustration"/>
    <img src="${row[7]}" alt="Illustration"/>
  </p>
`;

    // Insérer tout le contenu dans la page
    detailsContainer.innerHTML = `
        <div class="detail-column">
            <p><strong><i>${row[1]} ${row[2]}</i></strong></p>
            <p><img src="${row[4]}" alt="Illustration"/></p>
            <p><strong>Position phylogénétique</strong><br>
                Règne   : ${row[33]}<br>
                Phyllum : ${row[34]}<br>
                Classe  : ${row[35]}<br>
                Ordre   : ${row[36]}<br>
                Famille : ${row[37]}<br>
                Genre   : <i>${row[1]}</i><br>
                Espèce  : <i>${row[2]}</i><br>
            </p>
            <p><strong>Synonymes<br>
            </strong> <i>${row[3] || 'Aucun'}</i></p>
        </div>
        <div class="detail-item">${descriptionContent}</div>
        <div class="detail-item">
            <h3>Écologie</h3>
            <p><strong>Plantes hôtes :</strong> ${row[9]}</p>
            <p><strong>Mode de dispersion :</strong> ${row[29]}</p>
            <p><strong>Mode d'infection :</strong> ${row[30]}</p>
            <p><strong>Type de parasite :</strong> ${row[28]}</p>
            <p><strong>Potentiel de contagion à d'autres arbres :</strong> ${row[26]}</p>
        </div>
        <div class="detail-item">
            <h3>Symptômes</h3>
            <p><strong>Zone affectée :</strong> ${row[10]}</p>
            <p><strong>Structure affectée :</strong> ${row[11]}</p>
            <p><strong>Symptômes :</strong> ${row[12]}</p>
        </div>
        <div class="detail-item">
            <h3>Évolution et traitements</h3>
            <p><strong>Gravité sur la vigueur de l'arbre :</strong> ${row[24]}</p>
            <p><strong>Gravité sur la tenue mécanique de l'arbre :</strong> ${row[25]}</p>
            <p><strong>Vitesse d'évolution des symptômes :</strong> ${row[27]}</p>
            <p><strong>Traitements préventifs :</strong> ${row[31]}</p>
            <p><strong>Traitements curatifs :</strong> ${row[32]}</p>
        </div>
        <div class="detail-item">
            <h3>Sources et liens</h3>
            <p><strong>Sources :</strong> ${row[42]}</p>
            <p><strong>Page Mycobank :</strong> ${row[40]}</p>
            <p><strong>Page wiki :</strong> ${row[41]}</p>
            <p><strong>La base de données est en cours de développement, les données de chaque fiche doivent encore être vérifiées et sourcées.</strong></p>
            <p><strong>Statut actuel de cette fiche :</strong> ${row[43]}</p>
        </div>
    `;
} 
