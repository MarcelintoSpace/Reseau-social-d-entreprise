//récupération du formulaire
const form = document.querySelector("form");

//récupération du token dans le localStorage
const headers = {
    headers: {
        'Authorization': "Bearer " + localStorage.getItem("api-token"),
        'Content-Type': 'multipart/form-data'
    }
};
//vérification du token
if (localStorage.getItem("api-token")) {
    form.addEventListener('submit', function (e) {
        e.preventDefault()
//mise en forme des données
        const bodyFormData = new FormData();
        bodyFormData.append('title', e.target.title.value);
        bodyFormData.append('content', e.target.content.value);
        bodyFormData.append('image', e.target.media.files[0]);

//envoi du nouveau post au backend avec retour à la page d'accueil
        axios.post('http://localhost:3001/messages/new', bodyFormData, headers)
            .then((resp) => {
                window.location.href = 'index.html'
            })
    });
} else {
    window.location.href = 'login.html'
}

//vérification si les champs "input" sont bien remplis
const inputs = document.querySelectorAll("input")

const checkValidity = (input) => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault()
        if (!e.target.validity.valid) {
            e.target.parentElement.classList.add('erreur__formulaire')
        }
    })

    input.addEventListener('input', (e) => {
            if (e.target.validity.valid) {
                e.target.parentElement.classList.remove('erreur__formulaire')
            }
        }
    );
}

Array.from(inputs).forEach(checkValidity);
