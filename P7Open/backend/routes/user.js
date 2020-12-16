// Imports
const express = require('express');



const userCtrl = require('../controllers/user');

// Router
exports.router = (function () {
     //Users routes
    const userRouter = express.Router();

    //Users routes
    userRouter.post('/users/register', userCtrl.register);
    userRouter.post('/users/login', userCtrl.login);
    userRouter.get('/users/profil', userCtrl.getUserProfile);
    userRouter.put('/users/profil', userCtrl.updateUserProfile);
    userRouter.delete("/users/profil", userCtrl.deleteUserProfil); 


    return userRouter;
})();
