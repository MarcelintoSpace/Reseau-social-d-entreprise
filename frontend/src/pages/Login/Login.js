//importation de React
import React, {useState} from 'react';
//importation du CSS
import "./Login.css";
//importation du package "Axios"
import Axios from 'axios';
//création des chemins avec react-router-dom
import { useHistory } from "react-router-dom";
//importation du package "dotenv"
require('dotenv').config()

function Login() {
//création des hooks "usestate"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//création d'un message d'erreur
  const [errorMessage, setErrorMessage] = useState("");

//définition de "useHistory"
  let history = useHistory();

  //vérification du token
  Axios.post('http://localhost:3001/api/auth/login', {
    headers: {
      'Authorization': 'Bearer process.env.ENV_TOKEN',
    }
  })
  .then((res) => {
    console.log(res.data)
  })
  .catch((error) => {
    console.error(error)
  })

//création de la fonction login pour envoyer les infos au backend
  const login = () => {
    //appel du backend avec "Axios"
    Axios.post("http://localhost:3001/api/auth/login",
// création de l'objet body
    {
      email: email,
      password: password
    })
//création de la promise pour la réponse
      .then((response) => {
      //récupération du Json "loggedin" du backend avec mise en localstorage
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("email", response.data.email);
//redirection vers la page désirée
        history.push("/");
      } else {
      //Si l'email et le mot de passe sont incorrecte = message d'erreur
        setErrorMessage(response.data.message);
      }
    });
  };

//insertion du formulaire pour se connecter
  return (
    <div className="Login">
    <h1> Je me connecte </h1>
    <div className="LoginForm">
{/* définition des champs input */}
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

      <button onClick={login}>Connection</button>
{/*insertion message d'erreur*/}
      <h2 style={{ color: "red" }}>{errorMessage}</h2>
    </div>
  </div>
);
}

//export de login
export default Login;
