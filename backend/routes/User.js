//importation du package "express"
const express = require("express");
//définition du router
const router = express.Router();

//importation de la base de donnée
const db = require('../config/database');

//assignation des controllers
const useCtrl = require('../controllers/user');

//définition des chemin signin et login pour le CRUD
router.post("/signin", useCtrl.signin);
router.post("/login", useCtrl.login);


// export du router
module.exports = router;
