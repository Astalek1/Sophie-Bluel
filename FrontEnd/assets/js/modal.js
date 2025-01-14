import { getWorksApi, } from "./script.js";

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
/************fonction d'avctivatiuon de la modal**********/

export function openModal() {

    const modal1 = document.getElementById("modal1");
    const modal2 = document.getElementById("modal2");
    const AjoutModal = document.querySelector(".btn-modal");
    const btnModifier = document.querySelector(".btn-modifier");
    const BackModal = document.querySelector(".retour")
    const modalBackground = document.getElementById("modal-background");


    if (btnModifier) {
        btnModifier.addEventListener("click", async () => {
            modalBackground.style.display = "block";
            modal1.style.display = "block";

            console.log(' modalFunction exécutée');
            await modalGallery(); // Appelle la fonction pour afficher la galerie dans la modale
        });
    };

    if (AjoutModal) {
        AjoutModal.addEventListener("click", () => {
            modal2.style.display = "block";
        })
    }

    if (BackModal) {
        BackModal.addEventListener("click", () => {
            modal2.style.display = "none";
            resetModal();
        })
    }

    /************close Modal**************/
}

function closeModaleGeneral() {
    const modalBackground = document.getElementById("modal-background");
    const closeModal = document.querySelector(".btn-close");
    const closeModal2 = document.querySelector(".btn-close2");

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modalBackground.style.display = "none";
            modal1.style.display = "none";
        });
    };

    if (closeModal2) {
        try {
            closeModal2.addEventListener("click", () => {
                modalBackground.style.display = "none";
                modal1.style.display = "none";
                modal2.style.display = "none";
                resetModal();
            });
        } catch (error) {
            console.log("une erreur est survenu :", error)
        }
    };

    if (modalBackground) {
        modalBackground.addEventListener("click", () => {
            modalBackground.style.display = "none";
            modal1.style.display = "none";
            modal2.style.display = "none";
            resetModal();
        });
    };

}

/************modification de l'image************ */

function imageModification() {
    const fileInput = document.querySelector('.select-images input[type="file"]');
    const imageContainer = document.querySelector(".select-images");
    const imageIcon = document.querySelector(".select-images i");

    function handleImageDisplay(event) {
        const img = document.createElement('img');
        img.src = event.target.result;

        imageContainer.querySelector('img')?.remove();
        imageIcon.style.display = 'none';
        imageContainer.insertBefore(img, imageContainer.querySelector('.ajouter'));
    }


    fileInput.addEventListener("change", event => {
        const file = event.target.files[0];

        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert("Veuillez sélectionner une image");
            return;
        }
        if (file.size > 8 * 1024 * 1024) {
            alert("L'image ne doit pas dépasser 8Mo");
            return;
        }

        const reader = new FileReader();
        reader.onload = handleImageDisplay;
        reader.readAsDataURL(file);
    });
};


/************recuperation des catégories*************/


async function catégoriesApi() {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    const selectCategories = document.getElementById("Catégories");
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        selectCategories.appendChild(option);
    });
}


/***************reset la modal a la fermeture**********/

function resetModal() {
    // Réinitialisation de l'image
    const imageIcon = document.querySelector(".select-images i");
    const fileInput = document.querySelector('.select-images input[type="file"]');
    const imageContainer = document.querySelector(".select-images");
    const uploadedImage = imageContainer.querySelector('img');

    if (uploadedImage) {
        uploadedImage.remove()
    };
    if (imageIcon) {
        imageIcon.style.display = "block";
    }
    if (fileInput) {
        fileInput.value = "";
    }

    // Réinitialisation du titre
    const titleInput = document.getElementById("img-name");
    if (titleInput) {
        titleInput.value = "";
    }

    // Réinitialisation de la catégorie
    const categorySelect = document.getElementById("Catégories");
    if (categorySelect) {
        categorySelect.selectedIndex = 0;
    }
}


closeModaleGeneral();
imageModification();
catégoriesApi();
