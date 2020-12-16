// Importation des packages
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');


// Routes
module.exports = {
    register: function (req, res) {
        // Params
        const email = req.body.email;
        const password = req.body.password;
        const firstname = req.body.firstName;
        const lastname = req.body.lastName;
        const bio = req.body.bio;

        models.User.findOne({
            where: {email: email}
        })
            .then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function (err, bcryptedPassword) {
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
                                    return res.status(201).json({
                                        "status": "OK",
                                        'userId': newUser.id,
                                        'token': jwtUtils.generateTokenForUser(newUser)
                                    });
                                } else {
                                    return res.status(500).json({'error': 'cannot add user'});
                                }
                            })
                            .catch(function (err) {
                                return res.status(500).json({'error': 'cannot add user'});
                            });
                    });
                } else {
                    return res.status(409).json({'error': 'user already exist'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'unable to verify user'});
            });
    },
    login: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.User.findOne({
            where: {email: email}
        })
            .then(function (userFound) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                        if (resBycrypt) {
                            return res.status(200).json({
                                "status": "OK",
                                'userId': userFound.id,
                                'token': jwtUtils.generateTokenForUser(userFound)
                            });
                        } else {
                            return res.status(403).json({'error': 'invalid password'});
                        }
                    });
                } else {
                    return res.status(404).json({'error': 'user not exist in DB'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'unable to verify user'});
            });

    },

    // Pour recuperer le profile et pouvoir le modifier
    getUserProfile: function (req, res) {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({'error': 'wrong token'});

        models.User.findOne({
            attributes: ['id', 'email', 'firstName', 'lastName'],
            where: {id: userId}
        }).then(function (user) {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({'error': 'user not found'});
            }
        }).catch(function (err) {
            res.status(500).json({'error': 'cannot fetch user'});
        })
    },

    // Pour modifier le profile
    updateUserProfile: function (req, res) {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        //params
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;


        models.User.findByPk(userId).then(function (user) {
            if (user) {
                user.update({
                    firstname: firstName,
                    lastname: lastName,
                    email
                })
                .then(() => {
                    console.log ('modification du prénom accepté')
                    res.status(200).json(user);
                }).catch(() => {
                    res.status(500).json({'error': 'invalid fields '});
                })

            } else {
                res.status(404).json({"error": "no user found"});
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({'error': 'invalid fields '});
        })
    },
    //
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
