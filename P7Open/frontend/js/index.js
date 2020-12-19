//récupération du token
const headers = {
  headers: {
    'Authorization': "Bearer " + localStorage.getItem("api-token")
  }
};

//appel de l'affichage des messages
const getMessages = () => axios.get("http://localhost:3001/messages", headers).then((data) => {
  listMessages(data.data);
}, (err) => {
  window.location.href = 'login.html'
});

//définition du timing avec momentjs
moment.locale('fr')

//declaration de la fonction d'affichage des messages
const listMessages = (messages) => {
  for (let i in messages) {

    let nbLikes = messages[i].Likes.length;


    //conteneur principal HTML
    let listPost = document.getElementById("post-list");



    //création des élements de la structure principale du post
    let postBlock = document.createElement("article");
    postBlock.setAttribute("class", "post-contenant__index bgc");
    listPost.appendChild(postBlock);

    //le headers du post
    let postPoster = document.createElement("div");
    postPoster.setAttribute("class", "poster");
    postBlock.appendChild(postPoster);
    //l'user du post
    let postUserName = document.createElement("span");
    postUserName.setAttribute("class", "user-name");
    postUserName.innerHTML = messages[i].User.firstname + ' ' + messages[i].User.lastname + '<span class="post-date"> - ' + moment(messages[i].createdAt).format('LLL') + ' à poster : </span>';
    postPoster.appendChild(postUserName);

    // les images du Post
    if (messages[i].attachement) {
      let postBlockImage = document.createElement("div");
      postBlockImage.setAttribute("class", "block-image");
      postBlock.appendChild(postBlockImage);
      let postImage = document.createElement("img");
      postImage.setAttribute("src", 'http://localhost:3001/images/' + messages[i].attachement);
      postImage.setAttribute("alt", "image du post");
      postImage.setAttribute("class", "post-image");
      postBlockImage.appendChild(postImage);
    }

    //le titre du post
    if (messages[i].title) {
      let posTitle = document.createElement("h2");
      postBlock.appendChild(posTitle);
      posTitle.textContent = messages[i].title;
    }

    //le message du post
    if (messages[i].content) {
      let postBody = document.createElement("p");
      postBody.setAttribute("class", "body-post");
      postBlock.appendChild(postBody);
      postBody.innerHTML = messages[i].content;
    }

    //le footer du post
    let postAction = document.createElement("div");
    postAction.setAttribute("class", "action");
    postBlock.appendChild(postAction);

    //suppression du post
    if (messages[i].modifiable) {

      const postDeleteBtn = document.createElement('i');
      postDeleteBtn.className = 'fas fa-trash-alt'
      postAction.appendChild(postDeleteBtn)

      //envoi au backend de la suppression du post
      postDeleteBtn.addEventListener('click', () => {
        axios.delete(`http://localhost:3001/messages/delete/${messages[i].id}`, headers)
          .then((resp) => {
            postBlock.remove();
          })
      })
    }

    //modification du Post
    if (messages[i].modifiable) {
      const PostModifiableLink = document.createElement('a')
      PostModifiableLink.className = 'a__title'
      PostModifiableLink.href = `singl-post.html?id=${messages[i].id}`
      postAction.appendChild(PostModifiableLink)
      const postModifyBtn = document.createElement('i')
      postModifyBtn.className = 'fas fa-pencil-alt'
      PostModifiableLink.appendChild(postModifyBtn);
    }

    // le like
    const postLike = document.createElement('i');
    postLike.className = 'far fa-thumbs-up';
    postAction.appendChild(postLike);

    // le nombre de like
    const postNbLikes = document.createElement('span');
    postNbLikes.id = 'love';
    postLike.appendChild(postNbLikes);
    postNbLikes.innerHTML = nbLikes;

    let like = messages[i].liked

    let likeOrDislike = messages[i].liked ? 'dislike' : 'like'

    // envoi au backend si like ou dislike
    postLike.addEventListener('click', () => {
      axios.post(`http://localhost:3001/messages/${messages[i].id}/action/${likeOrDislike}`, {}, headers).then((resp) => {
        nbLikes = resp.data.Likes.length
        postNbLikes.innerHTML = nbLikes
      })
    })

  }

};
getMessages()
