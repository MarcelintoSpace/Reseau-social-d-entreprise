// Importation des packages
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');



module.exports = {

//s'enregistrer
    register: function (req, res) {
//définition des paramètres
        const email = req.body.email;
        const password = req.body.password;
        const firstname = req.body.firstName;
        const lastname = req.body.lastName;
        const bio = req.body.bio;

//recharche dans la base de données avec l'adresse email
        models.User.findOne({
            where: {email: email}
        })
            .then(function (userFound) {
                if (!userFound) {
//cryptage du mot de passe
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
//création du nouvel User
                        const newUser = models.User.create({
                            firstname,
                            lastname,
                            email: email,
                            password: bcryptedPassword,
                            bio: bio,
                            isAdmin: 0
                        })
                            .then(function (newUser) {
                                if (newUser) {
//validation de la création du User
                                    return res.status(201).json({
                                        "status": "OK",
                                        'userId': newUser.id,
                                        'token': jwtUtils.generateTokenForUser(newUser)
                                    });
                                } else {
                                    return res.status(500).json({'error': 'erreur serveur / ajout impossible'});
                                }
                            })
                            .catch(function (err) {
                                return res.status(500).json({'error': 'erreur serveur / ajout impossible'});
                            });
                    });
                } else {
                    return res.status(409).json({'error': 'conflit / l\'utilisateur exist déjà'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'erreur serveur / vérification impossible'});
            });
    },

//se loguer
    login: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;
//recherche si les champs sont remplis
        if (email == null || password == null) {
            return res.status(401).json({'error': 'utilisateur non authentifié'});
        }
//recherche dans la base de données par l'email
        models.User.findOne({
            where: {email: email}
        })
            .then(function (userFound) {
                if (userFound) {
//comparaison du mot de passe avec bcrypt
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        if (resBycrypt) {
                            return res.status(200).json({
                                "status": "OK",
                                'userId': userFound.id,
                                'token': jwtUtils.generateTokenForUser(userFound)
                            });
                        } else {
                            return res.status(403).json({'error': 'accès refusé / mot de pass invalide'});
                        }
                    });
                } else {
                    return res.status(403).json({'error': 'accès refusé / utilisateur inexistant'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'erreur serveur / vérification impossible'});
            });

    },


//Modification, suppression

  // récupération du profile dans la base de données
    getUserProfile: function (req, res) {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'Requête refusée / token invalide'});
        models.User.findOne({
//sélection dans la base de données
            attributes: ['id', 'email', 'firstName', 'lastName'],
            where: {id: userId}
        }).then(function (user) {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({'error': 'utilisateur non trouvé'});
            }
        }).catch(function (err) {
            res.status(500).json({'error': 'erreur serveur / recherche impossible'});
        })
    },

// Pour modifier le profile
    updateUserProfile: function (req, res) {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
//définition des paramètres
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;

//recherche du User avec findByPk
        models.User.findByPk(userId).then(function (user) {
            if (user) {
//update prénom, nom et email
                user.update({
                    firstname: firstName,
                    lastname: lastName,
                    email
                })
                .then(() => {
                    console.log ('modification du prénom accepté')
                    res.status(200).json(user);
                }).catch(() => {
                    res.status(500).json({'error': 'erreur serveur / champs invalide'});
                })

            } else {
                res.status(404).json({"error": 'utilisateur non trouvé'});
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({'error': 'erreur serveur / champs invalide'});
        })
    },

//suppression du User
    deleteUserProfil: function (req, res) {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        models.Like
            .destroy({where: {UserId: userId}})
            .then(() => models.Message.destroy({where: {userId: userId}}))
            .then(() => models.User.destroy({where: {id: userId}}))
            .then(() => res.status(204).json())
            .catch(error => res.status(400).json({error}));
    }
}
