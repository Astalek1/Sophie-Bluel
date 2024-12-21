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
            console.log("login valide")



        } else {
            console.log("mauvais mdp");

            const messageLoginError = "Erreur de login";
            const messageError = document.createElement(`p`);
            messageError.style.color = "red";
            document.querySelector("form").appendChild(messageError);
            messageError.textContent = messageLoginError;

        }
    } catch (error) {
        console.error("Une erreur est survenue :", error.message);
    }
}

function redirectToProjects() {
    window.location.href = "./index.html";
}