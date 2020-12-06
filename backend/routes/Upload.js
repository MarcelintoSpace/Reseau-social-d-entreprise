//importation du package "express"
const express = require("express");
//définition du router
const router = express.Router();

//importation de la base de donnée
const db = require('../config/database');

//assignation des controllers
const upCtrl = require('../controllers/upload');

//définition des chemin upload pour le CRUD
router.post("/", upCtrl.createPost);
router.get("/", upCtrl.getAllPost);
router.get("/byUser/:email", upCtrl.profile);
router.post("/like", upCtrl.createLike);


// export du router
module.exports = router;
