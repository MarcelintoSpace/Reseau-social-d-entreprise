//importation du package "mysql"
const mysql = require("mysql");
//importation du package "dotenv"
require('dotenv').config()

//établissement de la connection à mysql
const db = mysql.createConnection({
  host:       process.env.DB_HOST,
  user:       process.env.DB_USER,
  password:   process.env.DB_PASS,
  database:   process.env.DB_NAME
});

module.exports = db;
