//importation du package bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');
//importation du package jsonwebtoken pour générer les tokens
const jwt = require('jsonwebtoken');

//importation  de user.js du dossier models
const User = require('../routes/User');

//importation de la base de donnée
const db = require('../config/database');


exports.signin = ("/signin", (req, res) => {
    const name = req.body.name;
    const email= req.body.email;
    const password= req.body.password;

//insértion dans la base de donnée
      db.query(
        "INSERT INTO Users (name, email, password) VALUES (?, ?, ?);",
         [name, email, passeword],
         (err, results) => {
           console.log(err);
           res.send(results);
         }
       );
     });

exports.login = ("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password

//recherche de l'utilisateur dans la base de données
        db.query(
            "SELECT * FROM Users WHERE username = ?",
            email,
            (err, results) => {
         if (err) {
           console.log(err);
         }
         if (results.length > 0) {
                if (password == results[0].password) {
//recherche si le mot de passe est correct
                  res.json({
                     loggedIn: true,
                     email: email
                   });
            } else {
              res.json({
//si le mot de passe est incorrect = message d'erreur
            loggedIn: false,
            message: "Email ou mot de passe incorrcet !",
             });
           }
    } else {
        res.json({
//sinon l'utilisateur n'existe pas
          loggedIn: false,
          message: "L\'utilisateur n\'existe pas!"
        });
        }
       }
     );
   });
