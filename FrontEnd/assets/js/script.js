
import { openModal } from './modal.js';

export async function getWorksApi() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();

    return works;
}


export async function createGallery() {
    const container = document.getElementById("gallery")
    container.innerHTML = '';

    // Récupère les works depuis l'API
    const works = await getWorksApi();

    // Vérifie si le conteneur existe
    if (!container) {
        console.error("Le conteneur spécifié est introuvable !");
        return;
    }

    // Parcourt les données pour créer les éléments HTML
    works.forEach(item => {
        const figure = document.createElement('figure');
        figure.dataset.categoryId = item.categoryId;

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = item.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        container.appendChild(figure); // Ajoute la galerie au conteneur spécifié
    });
}

//...............mise en place  des filtres......................................

async function filtersSelect() {

    // Récupération des catégories via fetch
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();


    // Ajout de "Tous" directement
    const categoriesList = [{ id: 0, name: "Tous" }, ...categories];
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
    const galleryElement = document.getElementById("gallery")
    portfolioSection.insertBefore(filterContainer, galleryElement);

    // le boutton Tous est vert au chargement de la page.
    const filterTous = document.querySelector('[data-filter-id= "0"]');
    filterTous.classList.add("active");


    // Ajouter les événements de clic pour chaque bouton
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const galleryItems = document.querySelectorAll("figure");
            const selectedFilterId = event.target.dataset.filterId; // Récupère l'ID du filtre sélectionné

            // Ajoute une classe "active" au bouton cliqué
            filterButtons.forEach(btn => btn.classList.remove("active"));
            event.target.classList.add("active");

            // Filtre les éléments de la galerie
            galleryItems.forEach(item => {
                if (selectedFilterId === "0" || item.dataset.categoryId === selectedFilterId) {
                    item.style.display = "inline-block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}

function editionMode() {

    const banner = document.createElement(`div`);
    banner.classList.add("banner");

    const iconBanner = document.createElement(`i`);
    iconBanner.classList.add("fa-solid", "fa-pen-to-square");

    const txtEdition = document.createElement(`span`);
    txtEdition.textContent = "Mode édition";

    const btnModifier = document.createElement(`button`);
    btnModifier.classList.add("btn-modifier");

    const txtModifier = document.createElement(`span`);
    txtModifier.textContent = "modifier";

    const iconTxtmodifier = document.createElement(`i`);
    iconTxtmodifier.classList.add("fa-solid", "fa-pen-to-square");

    banner.appendChild(iconBanner);
    banner.appendChild(txtEdition);
    document.querySelector("header").appendChild(banner);

    const linkLogin = document.querySelector("ul a");
    linkLogin.textContent = "Logout";
    linkLogin.onclick = (event) => {
        sessionStorage.removeItem("token");
        event.preventDefault();
        window.location.href = "./index.html";
    };

    btnModifier.appendChild(iconTxtmodifier);
    btnModifier.appendChild(txtModifier);
    const portfolioSection = document.getElementById("portfolio")
    const gallery = document.getElementById("gallery");
    portfolioSection.insertBefore(btnModifier, gallery);
}

getWorksApi();

if (sessionStorage.getItem('token')) {
    createGallery();
    editionMode();
    openModal();

} else {
    await filtersSelect();
    createGallery();
} 
