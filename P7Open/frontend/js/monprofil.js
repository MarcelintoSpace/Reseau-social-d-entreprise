const form = document.querySelector("form");

const headers = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};


axios.get("http://localhost:3001/users/profil", headers)
    .then((data) => {

        const firstName = document.querySelector('#firstName');
        const lastName = document.querySelector('#lastName');
        const email = document.querySelector('#email');

        firstName.value = data.data.firstName;
        lastName.value = data.data.lastName;
        email.value = data.data.email;
    }, (err) => {
        window.location.href = 'login.html'
    });

// pour la modification d'un post
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const lastName = e.target.lastName.value;
    const firstName = e.target.firstName.value;
    const email = e.target.email.value;

    const data = {
        lastName,
        firstName,
        email
    }

    axios.put("http://localhost:3001/users/profil", data, headers).then(() => {
        alert('Profil modifié')
        window.location.href = 'index.html'
    })

})

const deleteAccount = document.getElementById('delete')
deleteAccount.addEventListener('click', () => {
    axios.delete("http://localhost:3001/users/profil", headers).then(() => {
        window.location.href = 'login.html'
    })
})
