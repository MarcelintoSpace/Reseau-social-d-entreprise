// Imports
const express = require('express');

const multer = require('../middleware/multer-config');

const messagesCtrl = require('../controllers/messages');
const auth = require('../middleware/auth')

// Router
exports.router = (function () {
    const messagesRouter = express.Router();

    // Messages routes
    messagesRouter.post('/messages/new/', auth, multer, messagesCtrl.createMessage);
    messagesRouter.put('/messages/:id', auth, multer, messagesCtrl.updatePost);
    messagesRouter.get('/messages/', auth,  messagesCtrl.listMessages);
    messagesRouter.get('/messages/:id', auth, messagesCtrl.getOneMessage);
    messagesRouter.delete('/messages/delete/:id', auth, messagesCtrl.deletePost);



    return messagesRouter;
})();
