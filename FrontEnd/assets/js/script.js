
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
async function filtersSelect() {


    // Récupération des catégories via fetch
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();

    if (sessionStorage.getItem('id') && sessionStorage.getItem('token')) {
        console.log("filtersSelect est bloquée");
        return;
    }


    // Ajout de "Tous" directement
    const categoriesList = [{ id: 0, name: "Tous", }, ...categories];
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

    // le boutton Tous est vert au chargement de la page.
    const filterTous = document.querySelector('[data-filter-id= "0"]');
    filterTous.classList.add("active");


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
                if (selectedFilterId === "0" || item.dataset.categoryId === selectedFilterId) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

        });
    });

}



function editionMode() {

    if (sessionStorage.getItem('id') && sessionStorage.getItem('token')) {

        const banner = document.createElement(`div`);
        banner.classList.add("banner");

        const iconBanner = document.createElement(`i`);
        iconBanner.classList.add("fa-solid", "fa-pen-to-square");

        const txtEdition = document.createElement(`span`);
        txtEdition.textContent = "Mode édition";

        const logOut = document.createElement(`li`)
        logOut.textContent = "logout";

        const btnModifier = document.createElement(`button`);
        btnModifier.classList.add("btn-modifier");

        const txtModifier = document.createElement(`span`);
        txtModifier.textContent = "modifier";

        const iconTxtmodifier = document.createElement(`i`);
        iconTxtmodifier.classList.add("fa-solid", "fa-pen-to-square");



        banner.appendChild(iconBanner);
        banner.appendChild(txtEdition);
        document.querySelector("header").appendChild(banner);

        const ulList = document.querySelector("ul");
        const loginItem = ulList.children[2];
        ulList.replaceChild(logOut, loginItem); // Remplace "login" par "logout"

        ulList.onclick = () => {
            sessionStorage.clear();
            redirectToProjects();
        };


        btnModifier.appendChild(iconTxtmodifier);
        btnModifier.appendChild(txtModifier);
        document.getElementById("portfolio").appendChild(btnModifier);

        console.log("editionMode est lancer");
    }
}


function redirectToLogin() {
    window.location.href = "./login.html";
}

function redirectToProjects() {
    window.location.href = "./index.html";
}


work();

filtersSelect();
editionMode();




