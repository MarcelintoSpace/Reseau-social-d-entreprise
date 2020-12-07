//importation du package 'fs' de Node
const fs = require('fs');
//importation  de user.js du dossier models
const Upload = require('../routes/upload');
//importation de la base de donnée
const db = require('../config/database');


//pour l'affichage du post
exports.createPost = (req, res) => {
//définition des élément dans le frontend
  const title = req.body.title;
  const content = req.body.content;
  const image_Url = req.body.image_Url;
  const author = req.body.author;
  const likes = req.body.likes;
db.query(
//insertion dans mysql
    "INSERT INTO posts (title, content, image_Url, author, likes) VALUE (?, ?, ?, ?, ?);",
    [title, content, image_Url, author, likes],
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
