//récupération du formulaire
const form = document.querySelector("form");

//mise en localStorage du token
const headers = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};

//vérification avec le backend si l'utilisateur est bien connecté
axios.get("http://localhost:3001/users/profil", headers)
    .then((data) => {

        const firstName = document.querySelector('#firstName');
        const lastName = document.querySelector('#lastName');
        const email = document.querySelector('#email');

        firstName.value = data.data.firstName;
        lastName.value = data.data.lastName;
        email.value = data.data.email;
    }, (err) => {
//demande de reconnection
        window.location.href = 'login.html'
    });

//modification du profil
form.addEventListener('submit', function (e) {
    e.preventDefault()
//récupération des éléments
    const lastName = e.target.lastName.value;
    const firstName = e.target.firstName.value;
    const email = e.target.email.value;

    const data = {
        lastName,
        firstName,
        email
    }

//envoi des nouvelles valeurs au backend et retour à la page d'accueil
    axios.put("http://localhost:3001/users/profil", data, headers).then(() => {
        alert('Profil modifié')
        window.location.href = 'index.html'
    })

})

//suppression du profil
const deleteAccount = document.getElementById('delete')
deleteAccount.addEventListener('click', () => {
//indication au backend de supprimer le profil et retour à la page d'accueil
    axios.delete("http://localhost:3001/users/profil", headers).then(() => {
        window.location.href = 'login.html'
    })
})
