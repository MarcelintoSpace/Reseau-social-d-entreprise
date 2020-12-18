//Récupèration du formulaire
const form = document.querySelector("form");

//Validation du formulaire
form.addEventListener('submit', (e) => {

//définition des valeurs d'enregistrement
    e.preventDefault()
            const lastName = e.target.lastname.value
            const firstName = e.target.firstname.value
            const email = e.target.email.value
            const password = e.target.password.value

//appel au backend avec axios
    axios.post("http://localhost:3001/users/register", { email, password, firstName, lastName }).then((resp) => {
        localStorage.setItem( 'api-token', resp.data.token)
        localStorage.setItem('user', JSON.stringify(resp.data.user));
//Rediriection vers la page d'accueil avec la liste des posts
        window.location = 'index.html'
    }, (err) => {
//l'utilisateur est déjà existant : message d'alerte avec redirection vers la page login      
        alert("vous êtes déjà enregistré! Veuillez entrée avec votre email et votre mot de passe");
        window.location.href = 'login.html'
        });
    });
