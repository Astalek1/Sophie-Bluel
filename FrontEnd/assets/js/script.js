//fonction de récupération de l'API (global)

async function work() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();



    //........................fonction de récupération de la gallery.............................//

    //pour ciblé la section portfolio
    const portfolioSection = document.getElementById("portfolio");

    //création de la div gallery
    const gallery = document.createElement(`div`);
    gallery.className = "gallery";

    // Parcourt les données pour créer les éléments HTML
    works.forEach(item => {

        // éléments créé
        const figure = document.createElement(`figure`);
        const img = document.createElement(`img`);
        const figcaption = document.createElement(`figcaption`);

        // Remplissage des attributs et contenus
        img.src = item.imageUrl;
        img.alt = item.title;
        figcaption.textContent = item.title;

        // Ajoute la catégorie pour le filtrage
        figure.dataset.category = item.category.name.toLowerCase();

        // structure
        figure.appendChild(img);
        figure.appendChild(figcaption);


        gallery.appendChild(figure);
    });

    portfolioSection.appendChild(gallery);


    // .................mise en place  des filtres......................................//

    categories();
}

async function categories() {
    // Récupération des catégories via fetch
    const response = await fetch("http://localhost:5678/api/categories");
    const objects = await response.json();

    // Ajout de "Tous" directement
    const ObjectsList = ["tous", ...objects.map(item => item.name.toLowerCase())];

    // Création du conteneur pour les filtres
    const filterContainer = document.createElement("div");
    filterContainer.className = "filters";

    // Créer et insérer chaque bouton
    ObjectsList.forEach(filterName => {
        const button = document.createElement("button");
        button.textContent = filterName.charAt(0).toUpperCase() + filterName.slice(1);
        button.className = "filter-button";
        button.dataset.filter = filterName;
        filterContainer.appendChild(button);
    });

    // Ajoute les filtres à la section portfolio
    const portfolioSection = document.getElementById("portfolio");
    portfolioSection.insertBefore(filterContainer, portfolioSection.querySelector(".gallery"));

    // Ajouter les événements de clic pour chaque bouton
    const filterButtons = document.querySelectorAll(".filter-button");
    const galleryItems = document.querySelectorAll(".gallery figure");

    filterButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const selectedFilter = event.target.dataset.filter;

            // Ajoute une classe "active" au bouton cliqué
            filterButtons.forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            // Filtre les éléments de la galerie
            galleryItems.forEach(item => {
                if (selectedFilter === "tous" || item.dataset.category === selectedFilter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

        });
    });
}

work()