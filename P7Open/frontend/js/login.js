//récupération du formulaire
const form = document.querySelector("form");


//Validation du login
form.addEventListener('submit', (e) => {
//mise en attente avec "preventDefault" avant la vérification au backend
    e.preventDefault()
    const  email = e.target.email.value;
    const password = e.target.password.value;

    axios.post('http://localhost:3001/users/login', { email, password }).then((resp) => {
        if (resp.data.status === 'OK') {
//mise en localStorage du token et User et redirection vers la page d'accueil
            localStorage.setItem('api-token', resp.data.token);
            window.location = `./index.html`;
        }
    }, (err) => {
      alert("pour accéder veuillez d'abord vous enregistrer");
      window.location.href = 'signup.html'
    });
});

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
