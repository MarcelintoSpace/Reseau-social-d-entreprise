'use strict';
module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        attachement: DataTypes.STRING,
        likes: DataTypes.INTEGER,
    }, {});

    Message.associate = function(models) {
        models.Message.belongsTo(models.User, {foreignKey: 'userId'});
        models.Message.hasMany(models.Like);
    };

    return Message;
};
