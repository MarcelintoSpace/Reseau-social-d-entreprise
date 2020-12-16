const form = document.querySelector("form"); // Récupère le formulaire




//Validation de notre formulaire de Commande
form.addEventListener('submit', (e) => {

    e.preventDefault()
            const lastName = e.target.lastname.value
            const firstName = e.target.firstname.value
            const email = e.target.email.value
            const password = e.target.password.value


    axios.post("http://localhost:3001/users/register", { email, password, firstName, lastName }).then((resp) => {
        localStorage.setItem( 'api-token', resp.data.token)
        localStorage.setItem('user', JSON.stringify(resp.data.user));
        window.location = 'index.html'// Redirige vers la liste des posts
    }, (err) => {
        alert("vous êtes déjà enregistré! Veuillez entrée avec votre email et votre mot de passe");
        window.location.href = 'login.html'
        });
    });
