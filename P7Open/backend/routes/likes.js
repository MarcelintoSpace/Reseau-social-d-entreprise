// Imports

const express = require('express');
const auth = require('../middleware/auth')

const likesCtrl = require('../controllers/likes');

// Router
exports.router = (function () {
    const likesRouter = express.Router();

    // Likes routes
    likesRouter.post('/messages/:messageId/action/like', auth, likesCtrl.likePost);
    

    return likesRouter;
})();