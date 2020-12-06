//importation du package 'fs' de Node
const fs = require('fs');
//importation  de user.js du dossier models
const Upload = require('../routes/Upload');
//importation de la base de donnée
const db = require('../config/database');


//pour l'affichage du post
exports.createPost = (req, res) => {
//définition des élément dans le frontend
  const title = req.body.title;
  const description = req.body.descryption;
  const imageUrl = req.body.imageUrl;
  const author = req.body.author;
db.query(
//insertion dans mysql
    "INSERT INTO posts (title, content, imageUrl, author) VALUE (?, ?, ?, ?);",
    [title, content, imageUrl, author],
(err, results) => {
  console.log(err);
//envoi des données
  res.send(results);
}
);
};

//affichage de tous les posts pour l'historique
exports.getAllPost = (req, res) => {
//sélection de tous les posts
  db.query("SELECT * FROM posts", (err, results) => {
    if (err) {
//console log si erreur
      console.log(err);
    }
//renvoi des résultats
    res.send(results);
  });
};

//affichage du profile
exports.profile = (req, res) => {
//affichage du profile dans le frontend
const userName = req.params.email
//sélection du username
  db.query("SELECT * FROM posts WHERE author = ?", userName, (err, results) => {
    if (err) {
//console log si erreur
      console.log(err);
    }
//renvoi des résultats
    res.send(results);
  });
};

//création des likes
exports.createLike = (req, res) => {
//définition des élément dans le frontend
const userLiking = req.body.userLiking;
const postId = req.body.postId;
  db.query(
  //insertion dans mysql des likes
      "INSERT INTO likes (userLiking, postId) VALUE (?, ?);",
      [userLiking, postId],
  (err, results) => {
    console.log(err);
  //mise à jour des likes pour éviter les doublons
  db.query("UPDATE posts SET = likes + 1 WHERE id = ?",
  postId,
  (err2, results2) => {
        res.send(results);
  })
  }
  );
};
