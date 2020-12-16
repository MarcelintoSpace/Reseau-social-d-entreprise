const form = document.querySelector("form"); // Récupère le formulaire




//Validation de notre formulaire de Commande
form.addEventListener('submit', (e) => {

    e.preventDefault()
    const  email = e.target.email.value;
    const password = e.target.password.value;

    axios.post('http://localhost:3001/users/login', { email, password }).then((resp) => {
        if (resp.data.status === 'OK') {
            localStorage.setItem('api-token', resp.data.token);
            localStorage.setItem('user', JSON.stringify(resp.data.user));
            window.location = `./index.html`; // Redirige vers la liste des posts
        }
    }, (err) => {
      alert("pour accéder veuillez d'abord vous enregistrer");
      window.location.href = 'signup.html'
    });
});

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
