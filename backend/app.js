//importation du package "express"
const express = require("express");
//Importation du package BodyParser
const bodyParser = require('body-parser');
//importation base de données
const db = require('./config/database');
//Importation de 'Path' afin de définir les chemins
const path = require('path');

//appel de la méthode Express
const app = express();

//Importation des Router 'Sauces' et 'user'
const uploadRoutes = require('./routes/upload');
const userRoutes = require('./routes/user');

//Insertion CORS
app.use((req, res, next) => {
  //qui peut accéder à l'API
  res.setHeader('Access-Control-Allow-Origin', '*');
  //Quels header sont authorisés
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //Quels méthodes sont possible
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//pour tranformer les requête en JSON
app.use(bodyParser.json());

//gestion des routes principales
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', userRoutes);

//exportation de la constante app
module.exports = app;
