//importation de React
import React, { useState } from 'react';
//imprtation du CSS
import './Signin.css';
//importation du package "Axios"
import Axios from 'axios';

function Signin() {
//création des "states"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//création de la fonction register pour envoyer les infos au backend
  const signin = () => {
//appel du backend avec "Axios"
  Axios.post("http://localhost:3001/user/signin",
// création de l'objet body
{
  name: name,
  email: email,
  password: password
})
//création de la promise pour la réponse
.then((response) => {
    console.log(response);
  });
  };

//insertion du formulaire pour s'inscrire
  return (
    <div className="Signin">
    <h1> Je m'inscrie ! </h1>
      <div className="SigninForm">
{/*définition des champs input*/}
      <input
        type="text"
        placeholder="email..."
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        />
      <input
        type="password"
        placeholder="mot de passe..."
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        />
      <input
        type="text"
        placeholder="nom d'utilisateur..."
        onChange={(event) => {
          setName(event.target.value);
        }}
        />
      <button onClick={signin}>Inscription</button>
      </div>
    </div>
);
}

//export de Signin
export default Signin;
