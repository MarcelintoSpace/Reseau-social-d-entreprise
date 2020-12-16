const form = document.querySelector("form"); // Récupère le formulaire


const headers = {
    headers: {
        'Authorization': "Bearer " + localStorage.getItem("api-token"),
        'Content-Type': 'multipart/form-data'
    }
};

if (localStorage.getItem("api-token")) {
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const bodyFormData = new FormData();
        bodyFormData.append('title', e.target.title.value);
        bodyFormData.append('content', e.target.content.value);
        bodyFormData.append('image', e.target.media.files[0]);

        axios.post('http://localhost:3001/messages/new', bodyFormData, headers)
            .then((resp) => {
                window.location.href = 'index.html'
            })
    });
} else {
    window.location.href = 'login.html'
}

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
