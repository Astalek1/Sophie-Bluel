import { getWorksApi, createGallery } from "./script.js";

export async function modalGallery() {

    const modalContainer = document.querySelector('.modal-container');

    // Vérifier si le conteneur existe
    if (!modalContainer) {
        console.error("Le conteneur de la modale est introuvable !");
        return;
    }

    // Supprimer les anciens contenus de la modale
    modalContainer.innerHTML = '';
    try {
        const works = await getWorksApi();

        //logique de supression de l'image
        works.forEach(item => {
            const figure = document.createElement('figure');
            figure.dataset.id = item.id;

            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.title;

            const figcaption = document.createElement('figcaption');
            figcaption.textContent = item.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            // Ajouter l'icône de suppression
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa', 'fa-trash');
            figure.classList.add('btn-delete');
            figure.appendChild(deleteIcon);

            // Ajouter au conteneur modal
            modalContainer.appendChild(figure);

            // Event listener pour la suppression
            deleteIcon.addEventListener('click', () => {
                console.log(`Suppression en attente pour l'élément avec ID : ${figure.dataset.id}`);
            });
        });
    } catch (error) {
        console.error("Erreur lors du chargement de la galerie modale:", error);
    };
}

export function openModal() {

    /************fonction d'avctivatiuonde la modal**********/

    const modal1 = document.getElementById("modal1");
    const modalBackground = document.getElementById("modal-background");
    const closeModal = document.querySelector(".btn-close");
    const btnModifier = document.querySelector(".btn-modifier");

    if (btnModifier) {
        btnModifier.addEventListener("click", async () => {
            modalBackground.style.display = "block";
            modal1.style.display = "block";

            console.log(' modalFunction exécutée');
            await modalGallery(); // Appelle la fonction pour afficher la galerie dans la modale
        });
    };
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modalBackground.style.display = "none";
            modal1.style.display = "none";
        });
    };
    if (modalBackground) {
        modalBackground.addEventListener("click", () => {
            modalBackground.style.display = "none";
            modal1.style.display = "none";
        });
    };

}
