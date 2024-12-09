//fonction de récupération de l'API (global)

async function maRecuperationApi() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const api = await reponse.json();


    //........................fonction de récupération de la gallery.............................//

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

        // Ajoute la catégorie pour le filtrage
        figure.dataset.category = item.category.name.toLowerCase();

        // structure
        figure.appendChild(img);
        figure.appendChild(figcaption);


        gallery.appendChild(figure);
    });

    portfolioSection.appendChild(gallery);


    // .................mise en place  des filtres......................................//

    // Appelle genereFiltres avec les données API
    genereFiltres(api);

    function genereFiltres(data) {

        // Extraire les catégories uniques à partir de category.name
        const categories = [...new Set(data
            .filter(item => item.category && item.category.name) // Vérifie que category et name existent
            .map(item => item.category.name.toLowerCase()))]; // Transforme en minuscule

        // Ajoute un filtre "Tous" au début
        categories.unshift("tous");
        console.log("Catégories uniques extraites :", categories);

        // Création des conteneurs pour les filtres
        const filterContainer = document.createElement("div");
        filterContainer.className = "filters";

        // Crée et insère chaque bouton
        categories.forEach(filter => {
            const button = document.createElement("button");
            button.textContent = filter.charAt(0).toUpperCase() + filter.slice(1); // Met la première lettre en majuscule
            button.className = "filter-button";
            button.dataset.filter = filter; // Ajoute un attribut data-filter pour le filtrage
            filterContainer.appendChild(button);
        });

        // Ajoute les filtres à la section portfolio
        const portfolioSection = document.getElementById("portfolio");
        portfolioSection.insertBefore(filterContainer, portfolioSection.querySelector(".gallery"));

        // Sélectionne tous les boutons de filtre
        const filterButtons = document.querySelectorAll(".filter-button");
        // Récupère tous les éléments de la galerie
        const galleryItems = document.querySelectorAll(".gallery figure");

        // Ajoute un événement "click" à chaque bouton
        filterButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                // Récupère le filtre sélectionné
                const filter = event.target.dataset.filter;

                // Ajoute une classe "active" au bouton cliqué et enlève-la des autres
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                // Filtre les éléments de la galerie
                galleryItems.forEach(item => {
                    if (filter === "tous" || item.dataset.category === filter) {
                        item.style.display = "block"; // Affiche l'élément
                    } else {
                        item.style.display = "none"; // Cache l'élément
                    }
                });

                // Affiche le filtre dans la console (pour debug)
                console.log(`Filtre sélectionné : ${filter}`);
            });
        });
    }
}

maRecuperationApi()