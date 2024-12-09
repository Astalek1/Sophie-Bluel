//fonction de récupération de l'API (global)

async function maRecuperationApi() {
    const reponse = await fetch("http://localhost:5678/api/works");
    console.log('reponse: ', reponse);
    const api = await reponse.json();
    console.log(api);



    //fonction de récupération de la gallery//

    //pour ciblé la section portfolio
    const portfolioSection = document.getElementById("portfolio");

    //création de la div gallery
    const gallery = document.createElement(`div`);
    gallery.className = "gallery";

    // Parcourt les données pour créer les éléments HTML
    api.forEach(item => {

        // éléments créé
        const figure = document.createElement(`figure`);
        const img = document.createElement(`img`);
        const figcaption = document.createElement(`figcaption`);

        // Remplissage des attributs et contenus
        img.src = item.imageUrl;
        img.alt = item.title;
        figcaption.textContent = item.title;

        // structure
        figure.appendChild(img);
        figure.appendChild(figcaption);


        gallery.appendChild(figure);
    });

    portfolioSection.appendChild(gallery);

    // récupération des filtres//

    // Appelle genereFiltres avec les données API
    genereFiltres(api);


    function genereFiltres(data) {

        // Extraire toutes les catégories uniques

        //obtention des catégories
        //const categories = [...new Set(data.map(item => item.category))];

        //pour ciblé la section portfolio
        const portfolioSection = document.getElementById("portfolio");

        //création des conteneurs pour les filtres
        const filterContainer = document.createElement("div");
        filterContainer.className = "filters";

        // Liste des filtres (boutons)
        const filters = ["Tous", "Objets", "Appartements", "Hotels & restaurants"];

        // Crée et insère chaque bouton
        filters.forEach(filter => {
            const button = document.createElement("button");
            button.textContent = filter;
            button.className = "filter-button"; // Classe pour le style
            button.dataset.filter = filter.toLowerCase(); // Ajoute un attribut data-filter pour le filtrage
            filterContainer.appendChild(button);
        });

        // Ajoute le conteneur des filtres à la section portfolio
        portfolioSection.insertBefore(filterContainer, portfolioSection.querySelector(".gallery"));
    }

}

maRecuperationApi()