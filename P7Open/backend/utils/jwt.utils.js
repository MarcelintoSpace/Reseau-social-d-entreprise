//importation du package jsonwebtoken
const jwt = require('jsonwebtoken');

//définition de la clé secrete d'encodage
const JWT_SIGN_TOKEN = "be;8hWe&K~iOLG.r'.Nfq1mW9l{KZq";

module.exports = {
    generateTokenForUser: function (userData) {

//signature admin ou User
        return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isAdmin
            },
            JWT_SIGN_TOKEN,
            {
//délais d'expiration
                expiresIn: '24h'
            })
    },

    parseAuthorization: function (authorization) {
//récupération du token après bearer
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
// recuperer le user id
    getUserId: function (authorization) {
//vérification des données      
        const token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
//décodage du token et vérification
                const jwtToken = jwt.verify(token, JWT_SIGN_TOKEN);
//vérification que le userId est le même
                if (jwtToken != null)
                    return jwtToken.userId;
            } catch (err) {
                return null
            }
        }
    }
}
