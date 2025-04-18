// Récupérer l'index de la ligne à partir de l'URL
const params = new URLSearchParams(window.location.search);
const resultIndex = params.get('index');

// Récupérer les données depuis Local Storage
const allData = JSON.parse(localStorage.getItem('allData'));

// Récupérer l'élément où afficher les détails
const detailsContainer = document.getElementById('result-details');

// Vérifier que les données existent et que l'index est valide
if (allData && resultIndex !== null && allData[resultIndex]) {
    const row = allData[resultIndex];

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
        <p><strong>Pérennité du sporophore :</strong> ${row[14]}</p>
        <p><strong>Forme du chapeau :</strong> ${row[15]}</p>
        <p><strong>Anneau :</strong> ${row[17]}</p>
    `;

    // Vérifier si la colonne "taille du sporophore" contient une valeur avant de l'afficher
    if (row[18] && row[18].trim() !== '') {
        descriptionContent += `<p><strong>Taille maximum du sporophore :</strong> ${row[18]}</p>`;
    }

    descriptionContent += `
        <p><strong>Agencement des sporophores :</strong> ${row[19]}</p>
        <p><strong>Structure de l'hyménium :</strong> ${row[20]}</p>
        <p><strong>Couleur de la cuticule :</strong> ${row[21]}</p>
        <p><strong>Couleur de l'hyménium :</strong> ${row[22]}</p>
        <p><strong>Couleur de la chair :</strong> ${row[23]}</p>
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
    `;
} else {
    detailsContainer.textContent = 'Aucun résultat trouvé';
}
