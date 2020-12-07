//importation du package "express"
const express = require("express");
//Importation du package BodyParser
const bodyParser = require('body-parser');
//importation base de données
const db = require('./config/database');
//importation du package "Cors"
const cors = require('cors');

//appel de la méthode Express
const app = express();

//Insertion CORS
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//pour tranformer les requête en JSON
app.use(bodyParser.json());

//Importation des Routers 'user'
const userRoute = require("./routes/user");
app.use("/user", userRoute);

//importation de la route 'Upload'
const uploadRoute = require("./routes/upload");
app.use("/upload", uploadRoute);

//exportation de la constante app
module.exports = app;
