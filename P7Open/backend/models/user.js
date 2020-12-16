'use strict';
//Création du shéma de données du User
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        userUrl: DataTypes.STRING,
        bio: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN
    }, {});

//assoiation à la Table Message
    User.associate = function (models) {

        models.User.hasMany(models.Message);
    };

//exportation du model
    return User;
};
