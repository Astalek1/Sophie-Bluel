//fonction de récupération de l'API (global)

async function work() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();



    //........................fonction de récupération de la gallery.............................//

    //pour ciblé la section portfolio
    const portfolioSection = document.getElementById("portfolio");

    //création de la div gallery
    const gallery = document.createElement(`div`);
    gallery.classList.add("gallery");

    // Parcourt les données pour créer les éléments HTML
    works.forEach(item => {

        // éléments créé
        const figure = document.createElement(`figure`);

        // Ajout de l'ID de la catégorie
        figure.dataset.categoryId = item.categoryId;

        const img = document.createElement(`img`);
        const figcaption = document.createElement(`figcaption`);

        // Remplissage des attributs et contenus
        img.src = item.imageUrl;
        img.alt = item.title;
        figcaption.textContent = item.title;

        // Ajoute la catégorie pour le filtrage
        figure.dataset.category = item.category.name

        // structure
        figure.appendChild(img);
        figure.appendChild(figcaption);


        gallery.appendChild(figure);
    });

    portfolioSection.appendChild(gallery);
}

// .................mise en place  des filtres......................................//


async function displayCategories() {
    // Récupération des catégories via fetch
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    // Ajout de "Tous" directement
    const categoriesList = [{ id: "tous", name: "Tous", classList: "active" }, ...categories];
    // Création du conteneur pour les filtres
    const filterContainer = document.createElement("div");
    filterContainer.classList.add("filters");

    // Créer et insérer chaque bouton
    categoriesList.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;
        button.classList.add("filter-button");
        button.dataset.filterId = category.id;
        filterContainer.appendChild(button);
    });

    // Ajoute les filtres à la section portfolio
    const portfolioSection = document.getElementById("portfolio");
    portfolioSection.insertBefore(filterContainer, portfolioSection.querySelector(".gallery"));


    const tous = document.querySelector('[data-filter-id="tous"]');
    tous.classList.add("active");


    // Ajouter les événements de clic pour chaque bouton
    const filterButtons = document.querySelectorAll(".filter-button");




    filterButtons.forEach(button => {

        button.addEventListener("click", (event) => {
            const galleryItems = document.querySelectorAll(".gallery figure")
            const selectedFilterId = event.target.dataset.filterId; // Récupère l'ID du filtre sélectionné
            // Ajoute une classe "active" au bouton cliqué
            filterButtons.forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            // Filtre les éléments de la galerie
            galleryItems.forEach(item => {
                if (selectedFilterId === "tous" || item.dataset.categoryId === selectedFilterId) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

        });
    });
}

function redirectToLogin() {
    window.location.href = "./login.html";
}


work()
displayCategories();