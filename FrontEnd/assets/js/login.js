const loginForm = document.querySelector("form");

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;

    if (!email || !password) return; // Empêche l'envoi si les champs sont vides

    await loginValidation(email, password);
});

async function loginValidation(email, password) {
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        });

        const data = await response.json();

        if (data.userId && data.token) {
            //window.location.href = 'page-connexion.html'; // Redirection en cas de succès
            console.log("login valide")

        } else {
            console.log("mauvais mdp");

            const loginError = "Erreur de login";
            const zoneError = document.createElement(`p`);
            zoneError.style.color = "red";
            document.querySelector("form").appendChild(zoneError);
            zoneError.textContent = loginError;
        }


    } catch (error) {

    }
}

function redirectToProjects() {
    window.location.href = "./index.html";
}