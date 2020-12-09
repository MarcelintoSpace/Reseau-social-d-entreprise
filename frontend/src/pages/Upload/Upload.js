//importation de React
import React, { useState } from 'react';
//importation du CSS
import './Upload.css';
//importation du package "Axios"
import Axios from 'axios';
//importation du router de react
import { useHistory } from "react-router-dom";


function Upload() {
//création des hooks "useState" pour le titre, la description et le fichier
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState([]);

//définition de la fonction history
  let history = useHistory();

//création de la fonction Upload pour envoyer les infos au backend
  const upload = () => {

//création de l'objet  formData
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "vgmulp38");
//git
//appel de cloudinary avec "Axios" pour récupérer les images
    Axios.post(
    `https://api.cloudinary.com/v1_1/dmzcffyi1/image/upload`,
    formData
    ).then((response) => {
      const fileName = response.data.public_id;

//appel du backend avec "Axios"
Axios.post("http://localhost:3001/api/upload", {
//création du corp du post
  title: title,
  description: description,
  image: fileName,
  author: localStorage.getItem("username"),
}).then(() => {
  history.push("/");
});
});
};

//définition du Upload
  return (
    <div className="Upload">
    <h1> Partager ! </h1>
      <div className="UploadForm">
{/*définition des champs input*/}
      <input
        type="text"
        placeholder="Titre..."
        onChange={(event) => {
        setTitle(event.target.value);
        }}
        />

      <input
        type="text"
        placeholder="Description..."
        onChange={(event) => {
        setDescription(event.target.value);
        }}
        />
{/*chargement de l'image avec l'élément (e)prevent}*/}
        <input type="file" onChange={(e) => setImage(e.target.files)} />
        <button onClick={upload}>Upload</button>
      </div>
    </div>
  );
}

//export de Upload
export default Upload;
