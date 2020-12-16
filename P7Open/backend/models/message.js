'use strict';
//Création du shéma de données de Message
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        attachement: DataTypes.STRING,
        likes: DataTypes.INTEGER,
    }, {});

//assoiation aux Tables User et Like
    Message.associate = function(models) {
        models.Message.belongsTo(models.User, {foreignKey: 'userId'});
        models.Message.hasMany(models.Like);
    };

//exportation du model
    return Message;
};
