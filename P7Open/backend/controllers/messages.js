// Importation des packages
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs').promises


// CRUD

module.exports = {
//création d'un message
    createMessage: function (req, res) {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        const title = req.body.title;
        const content = req.body.content;


// detection pour savoir si les champs sont remplis
        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
//sélection du user grâce à "findByPk + id"
        models.User.findByPk(userId)
            .then(function (userFound) {
                if (!userFound) {
                    return res.status(400).json({'error': 'user not found'});
                }
//création du message avec par defaut like = 0
                models.Message.create({
                    title: title,
                    content: content,
                    likes: 0,
                    UserId: userFound.id,
                    attachement: req.file ? req.file.filename : null
                })
               .then((newMessage) => {
                        return res.status(201).json(newMessage);
                    }).catch(() => {
                        return res.status(500).json({'error': 'cannot post message'});
                    })

            })
            .catch(function (err) {
                return res.status(500).json({'error': 'unable to verify user'});
            });
    },

//liste des messages
    listMessages: function (req, res) {
//definition du userId avec demande d'autorisation (JWT)
        const userId = jwtUtils.getUserId(req.headers['authorization']);
//sélection des colonnes qu'on veut afficher
        const fields = req.query.fields;
//visualisalisation uniquement d'un nombre de message
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
//classer les message dans l'ordre
        const order = req.query.order;


//Récupération de l'utilisateur connecté pour savoir si il est administrateur
        models.User.findByPk(userId).then((user) => {
            return models.Message.findAll({
//mise en ordre descendant de tous les messages
                order: [(order != null) ? order.split(':') : ['createdAt', 'DESC']],
                include: [
                    {
                        model: models.User,
                        as: 'User',
                    },
                    {
                        model: models.Like,
                        as: 'Likes'
                    }
                ]
            }).then((messages) => ({messages: messages, isAdmin: user.get('isAdmin')}))
        }).then(function ({messages, isAdmin}) {
//ajout d'un attribut lorsque le message appartient à l'utilisateur ou à l'admin
            const m = messages
//utilisation de spread             
                .map(m => ({...m.dataValues, modifiable: isAdmin || m.dataValues.User.id === userId}))
            res.status(200).json(m)
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields' });
        })
    },

//sélection d'un message
    getOneMessage: function (req, res) {
        models.Message.findByPk(req.params.id).then(function (message) {
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ "error": "no message found" });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields ' });
        })
    },

//Modifier un message
    updatePost: function (req, res) {
        const id = req.params.id;
        const title = req.body.title;
        const content = req.body.content;

        models.Message.findByPk(req.params.id).then(function (message) {
            if (message) {
                message.update({
                    title,
                    content,
                }).then(() => {
                    console.log ('modification du message')
                    res.status(200).json(message);
                }).catch(() => {
                    res.status(500).json({ 'error': 'invalid fields' });
                })

            } else {
                res.status(404).json({ 'error': "no message found" });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields' });
        })
    },

//supprimer un message
    deletePost: function (req, res) {
        const id = req.params.id

//sélection du message grâce à "findByPk + id"
        models.Message.findByPk(id).then((message) => {
            const attachement = message.get('attachement');
            let response = null
            if(!attachement){
                response = message.destroy()
            } else {
                const filePath = __dirname + '/../images/' + attachement
                response = fs.unlink(filePath)
                    .then(() => message.destroy())
            }
            response.then(() => res.status(204).json())
                .catch((error) => res.status(400).json({ error }))
        })
    }
}
