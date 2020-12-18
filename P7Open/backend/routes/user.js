//Importation du router d'Express
const express = require('express');

//importation des controllers
const userCtrl = require('../controllers/user');


exports.router = (function () {

    const userRouter = express.Router();

//Définition des Router
    userRouter.post('/users/register', userCtrl.register);
    userRouter.post('/users/login', userCtrl.login);
    userRouter.get('/users/profil', userCtrl.getUserProfile);
    userRouter.put('/users/profil', userCtrl.updateUserProfile);
    userRouter.delete("/users/profil", userCtrl.deleteUserProfil);

//exportation des router
    return userRouter;
})();
