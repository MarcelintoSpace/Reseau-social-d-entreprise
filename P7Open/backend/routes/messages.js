//Importation du router d'Express
const express = require('express');
//importation des Middleware 'auth'
const multer = require('../middleware/multer-config');
//importation des controllers
const messagesCtrl = require('../controllers/messages');
//importation du middelware Multer
const auth = require('../middleware/auth')


exports.router = (function () {
    const messagesRouter = express.Router();

//Définition des Router
    messagesRouter.post('/messages/new/', auth, multer, messagesCtrl.createMessage);
    messagesRouter.put('/messages/:id', auth, multer, messagesCtrl.updatePost);
    messagesRouter.get('/messages/', auth,  messagesCtrl.listMessages);
    messagesRouter.get('/messages/:id', auth, messagesCtrl.getOneMessage);
    messagesRouter.delete('/messages/delete/:id', auth, messagesCtrl.deletePost);


//exportation des router
    return messagesRouter;
})();
