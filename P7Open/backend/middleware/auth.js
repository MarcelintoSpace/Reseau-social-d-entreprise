//importation du package jsonwebtoken pour générer les tokens
const jwt = require('jsonwebtoken');

//export des Middleware
module.exports = (req, res, next) => {
//vérification des données
  try {
//récupération du token après bearer
    const token = req.headers.authorization.split(' ')[1];
//décodage du token et vérification
    const decodedToken = jwt.verify(token, "be;8hWe&K~iOLG.r'.Nfq1mW9l{KZq");
    const userId = decodedToken.userId;
//vérification que le userid est le même
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User Id non valable !';
//si ils ne sont pas identique = message d'erreur
    } else {
// si tout est OK
      next();
    }
  } catch {
//si une des 4 authentification n'est pas ok = message d'erreur 402
    res.status(402).json({
      error: new Error('Requête invalide !')
    });
  }
};
