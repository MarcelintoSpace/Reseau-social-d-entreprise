//Importation du router d'Express
const express = require('express');
//importation des Middleware 'auth'
const auth = require('../middleware/auth')

//importation des controllers
const likesCtrl = require('../controllers/likes');

exports.router = (function () {
    const likesRouter = express.Router();

//Définition du Router
    likesRouter.post('/messages/:messageId/action/like', auth, likesCtrl.likePost);

//exportation des router
    return likesRouter;
})();
