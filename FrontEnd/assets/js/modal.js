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
            deleteIcon.addEventListener('click', async () => {
                //console.log(`Suppression en attente pour l'élément avec ID : ${figure.dataset.id}`);
                try {
                    const token = sessionStorage.getItem('token');
                    const response = await fetch(`http://localhost:5678/api/works/${figure.dataset.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Erreur lors de la suppression');
                    }


                    // Mettre à jour la galerie principale
                    const galleryContainer = document.querySelector(".gallery");
                    galleryContainer.innerHTML = '';  // Vider d'abord
                    await createGallery();    // Mise à jour de la galerie principale


                    // Mettre à jour la galerie principale
                    const modalContainer = document.querySelector(".modal-container");
                    modalContainer.innerHTML = '';  // Vider d'abord
                    await modalGallery();     // Mise à jour de la galerie modale

                    // Fermer la modale après les mises à jour
                    resetModal();
                    modal2.style.display = "none";
                    modalBackground.style.display = "none";


                } catch (error) {
                    console.error("Erreur lors de la suppression:", error);
                }
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

function closeModalGeneral() {
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
    const errorMessage = document.getElementById("error-message");

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
    if (errorMessage) {
        errorMessage.style.display = "none";
        errorMessage.textContent = "";
    }
}

/************* validation de la modale**************/



function validateModal() {
    const fileInput = document.querySelector('.select-images input[type="file"]');
    const imgName = document.getElementById("img-name");
    const categories = document.getElementById("Catégories");
    const btnValider = document.querySelector(".btn-valider");
    const errorMessage = document.getElementById("error-message");
    const modal2 = document.getElementById("modal2");
    const modalBackground = document.getElementById("modal-background");

    function verifyInputs() {
        return fileInput.files.length > 0 &&
            imgName.value.trim() !== "" &&
            categories.value !== "";
    }

    btnValider.addEventListener("click", async (event) => {
        event.preventDefault();

        if (!verifyInputs()) {
            errorMessage.textContent = "Veuillez remplir tous les champs";
            errorMessage.style.display = "block";
            return;
        }
        errorMessage.style.display = "none";
        console.log("Formulaire valide");

        try {
            const formData = new FormData();
            formData.append('image', fileInput.files[0]);
            formData.append('title', imgName.value);
            formData.append('category', categories.value);

            const token = sessionStorage.getItem('token');
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi");
            }

            const updatedWorks = await getWorksApi();
            const container = document.getElementById("portfolio"); // Même sélecteur que createGallery
            if (container) {
                // Vider seulement les figures existantes
                const existingFigures = container.querySelectorAll('figure');
                existingFigures.forEach(figure => figure.remove());

                // Ajouter les nouvelles figures
                updatedWorks.forEach(item => {
                    const figure = document.createElement('figure');
                    figure.dataset.categoryId = item.categoryId;

                    const img = document.createElement('img');
                    img.src = item.imageUrl;
                    img.alt = item.title;

                    const figcaption = document.createElement('figcaption');
                    figcaption.textContent = item.title;

                    figure.appendChild(img);
                    figure.appendChild(figcaption);
                    container.appendChild(figure);
                });
            }


            // Fermeture et réinitialisation de la modale
            resetModal();
            modal2.style.display = "none";
            modalBackground.style.display = "block";

            // Mise à jour de la galerie modale
            const modalContainer = document.querySelector('.modal-container');
            if (modalContainer) {
                modalContainer.innerHTML = '';
                await modalGallery();
            }

        } catch (error) {
            console.error("Erreur:", error);
            errorMessage.textContent = "Erreur lors de l'envoi";
            errorMessage.style.display = "block";
        }
    });
}

closeModalGeneral();
imageModification();
catégoriesApi();
validateModal();
