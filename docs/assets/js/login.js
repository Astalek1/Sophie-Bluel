
function initializeLogin() {

    const loginForm = document.querySelector("form");

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Empêche le rechargement de la page


        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value;


        const emptyFields = " remplissez les champs";
        let emptyMessage = document.querySelector(".emptyFields");
        let messageError = document.querySelector(".errorMessage");

        if (email === "" && password === "") {
            if (!emptyMessage) {
                emptyMessage = document.createElement(`p`);
                emptyMessage.classList.add("emptyFields");
                emptyMessage.style.color = "red";
                document.querySelector("form").appendChild(emptyMessage);
            }
            if (messageError) {
                messageError.innerHTML = "";
            }

            emptyMessage.textContent = emptyFields;
            return;
        }

        await loginValidation(email, password);
    });
}
initializeLogin();

async function loginValidation(email, password) {

    const response = await fetch('https://sophie-bluel-production.up.railway.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    });


    const data = await response.json();

    if (data.token) {
        sessionStorage.setItem("token", data.token);
        //retour vers la page projet en activant le mode administateur.
        window.location.href = "./index.html";
    } else {
        const messageLoginError = "Erreur de login";
        let messageError = document.querySelector(".errorMessage");
        let emptyMessage = document.querySelector(".emptyFields");

        if (!messageError) {
            messageError = document.createElement(`p`);
            messageError.classList.add("errorMessage");
            messageError.style.color = "red";
            document.querySelector("form").appendChild(messageError);
        }
        if (emptyMessage) {
            emptyMessage.innerHTML = "";
        }

        messageError.textContent = messageLoginError;
    }
};



