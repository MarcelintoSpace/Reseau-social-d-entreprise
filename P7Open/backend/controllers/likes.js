// Importation des packages
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');


// Définition des Likes et dislikes
const DISLIKED = 0;
const LIKED = 1;

module.exports = {
//Déclaration des Likes
    likePost: function (req, res) {
//confirmation de l'authorisation avec JWT
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
//recherche de l'ID du message
        const messageId = parseInt(req.params.messageId);

        if (messageId <= 0) {
            return res.status(400).json({'error': 'problème de paramètres'});
        }
//Récupération du message avec findOne
        models.Message.findOne({
            where: {id: messageId},
            include: [{
                model: models.Like,
                where: {userId}
            }]
        })
            .then(foundLike => {
                return models.Message.findOne({
                    where: {id: messageId}
                }).then((message) => {
                    if (!foundLike) {
                        return message.addUser(userId)
                    } else {
                        return message.removeUser(userId)
                    }
                })
            })
            .then(() => {
                return models.Message.findOne({
                    where: {id: messageId},
                    include: [{
                        model: models.Like,
                    }]
                })
            })
// Confirmation avec status 201
            .then((post) => {
                res.status(201).json(post)
            })
// Erreur avec status 400
            .catch(error => {
                console.log(error)
                res.status(400).json({error})
            });
    }
}
