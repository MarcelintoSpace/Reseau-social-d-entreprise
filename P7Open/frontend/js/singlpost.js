const form = document.querySelector('form');
const deleteBtn = document.getElementById('delete-post');

let params = new URL(document.location).searchParams;
let idMessage = params.get("id");

const headers = {
    headers: { 'Authorization': "Bearer " + localStorage.getItem("api-token") }
};

axios.get("http://localhost:3001/messages/" + idMessage, headers)
    .then(({ data: message }) => {
        const title = document.querySelector('#title')
        const post = document.querySelector('#post')
        title.value = message.title
        post.value = message.content
    },(err) => {
        window.location.href = 'login.html'
    });

// pour la modification d'un post
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const title = e.target.title.value;
    const content = e.target.post.value;

    const data = {
        title,
        content
    }

    axios.put("http://localhost:3001/messages/" + idMessage, data, headers).then(() => {
        window.location.href = 'index.html'
    })

})

// pour la suppression d'un post
deleteBtn.addEventListener('click', (e) => {
    e.preventDefault()
    axios.delete("http://localhost:3001/messages/delete/" + idMessage, headers).then(() => {
        window.location.href = 'index.html'
    })
})
