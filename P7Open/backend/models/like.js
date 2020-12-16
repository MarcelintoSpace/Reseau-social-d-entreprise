'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
  }, {});
  Like.associate = function(models) {

    models.User.belongsToMany(models.Message, {
      through: models.Like,
      onDelete: 'CASCADE'
    });

    models.Message.belongsToMany(models.User, {
      through: models.Like,
    });
  };
  return Like;
};
