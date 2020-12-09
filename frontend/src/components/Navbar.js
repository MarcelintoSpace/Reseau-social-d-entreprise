//importation de React
import React, { useEffect, useState } from 'react';
//importation du CSS
import './Navbar.css';

function Navbar() {

//définition du hook "useState"
const [loggedIn, setLoggedIn] = useState(true);

//vérification si l'utilisateur est loguer avec le localstorage
useEffect(() => {
  console.log(localStorage.getItem("loggedIn"));
  setLoggedIn(localStorage.getItem("loggedIn"));
  console.log(loggedIn);
}, [localStorage.getItem("loggedIn")]);

//insertion des liens du Navbar
  return (
    <div className="Navbar">
      <a href="/">Accueil</a>
{/*savoir si l'utilisateur est loguer pour le menu dynamique*/}
      {loggedIn ? (
        <>
        <a href="/profile">Profile</a>
        <a href="/upload">Partage</a>
        </>
      ) : (
        <>
        {/*git*/}
        <a href="/signin">S'incrire</a>
        <a href="/login">Se Connecter</a>
        </>
      )}
    </div>
);
}

//export de Navbar
export default Navbar;
