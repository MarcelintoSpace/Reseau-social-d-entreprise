//Importation du package Express
const express = require('express');
//Importation du package Body-Parser
const bodyParser = require('body-parser');
//Importation de 'Path' afin de définir les chemins
const path = require('path');

//Importation des Router 'User', 'Message' et 'Like'
const userRoutes = require('./routes/user').router;
const messagesRoutes = require('./routes/messages').router;
const likesRoutes = require('./routes/likes').router;

//appel de la méthode Express
const app = express();

//Insertion CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//tranformation des requête en JSON
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

//gestion des routes principales
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/', userRoutes);
  app.use('/profil/', userRoutes);
  app.use('/', messagesRoutes);
  app.use('/', likesRoutes);

//exportation de app
module.exports = app;
