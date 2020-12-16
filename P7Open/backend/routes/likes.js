//Importation du router d'Express
const express = require('express');
//importation des Middleware 'auth'
const auth = require('../middleware/auth')

//importation des controllers
const likesCtrl = require('../controllers/likes');

//Définition des Router
exports.router = (function () {
    const likesRouter = express.Router();

    // Likes routes
    likesRouter.post('/messages/:messageId/action/like', auth, likesCtrl.likePost);


    return likesRouter;
})();
