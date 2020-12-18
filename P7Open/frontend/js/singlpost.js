const form = document.querySelector('form');
const deleteBtn = document.getElementById('delete-post');

let params = new URL(document.location).searchParams;
let idMessage = params.get("id");

//mise en localStorage du token
const headers = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};

//appel au backend pour récupérer le message avec idMessage
axios.get("http://localhost:3001/messages/" + idMessage, headers)
    .then(({ data: message }) => {
        const title = document.querySelector('#title')
        const post = document.querySelector('#post')
        title.value = message.title
        post.value = message.content
    },(err) => {
//si erreur redirection page de connection
        window.location.href = 'login.html'
    });

//modification d'un post
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const title = e.target.title.value;
    const content = e.target.post.value;

    const data = {
        title,
        content
    }
//renvoi des données au backend puis redirection page d'accueil
    axios.put("http://localhost:3001/messages/" + idMessage, data, headers).then(() => {
        window.location.href = 'index.html'
    })

})

//suppression d'un post
deleteBtn.addEventListener('click', (e) => {
    e.preventDefault()
//indication de supression au backend puis redirection page d'accueil    
    axios.delete("http://localhost:3001/messages/delete/" + idMessage, headers).then(() => {
        window.location.href = 'index.html'
    })
})
