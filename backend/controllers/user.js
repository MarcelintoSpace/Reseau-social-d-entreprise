//importation du package bcrypt pour hasher le mot de passe
const bcrypt = require('bcrypt');
//importation du package jsonwebtoken pour générer les tokens
const jwt = require('jsonwebtoken');

//importation  de user.js du dossier models
const User = require('../routes/user');

//importation de la base de donnée
const db = require('../config/database');


exports.signin = ("/user/signin", (req, res) => {
    const name = req.body.name;
    const email= req.body.email;
    const password= bcrypt.hashSync(req.body.password, 10);

//insértion dans la base de donnée
      db.query(
        "INSERT INTO Users (name, email, password) VALUES (?, ?, ?);",
         [name, email, password],
         (err, results) => {
           console.log(err);
           res.send(results);
         }
       );
     });

     exports.login = ("/user/login", (req, res) => {
         const email = req.body.email;
         const password = req.body.password

     //recherche de l'utilisateur dans la base de données
             db.query(
                 "SELECT * FROM Users WHERE email = ?",
                 email,
                 (err, results) => {
              if (err) {
                console.log(err);
              }
              if (results.length > 0) {
                     bcrypt.compare(password, results[0].password, (err, passwordValid) => {
                      if (passwordValid) {
                        res.json({
                           loggedIn: true,
                           email: email
                         });
     //recherche si le mot de passe est correct

                 } else {
                   res.json({
     //si le mot de passe est incorrect = message d'erreur
                 loggedIn: false,
                 message: "Email ou mot de passe incorrect !",
                  });
                }
                });
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
