'use strict';
module.exports = (sequelize, DataTypes) => {
//Création du shéma de données de Like
  const Like = sequelize.define('Like', {
//type attendu db: INTEGER, pour intéragir avec les autres tables
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

//assoiation aux Tables "Message" et "User"
  Like.associate = function(models) {
    models.User.belongsToMany(models.Message, {
      through: models.Like,
//utilisation de CASCADE pour la suppression
      onDelete: 'CASCADE'
    });

    models.Message.belongsToMany(models.User, {
      through: models.Like,
    });
  };
  //exportation du model
  return Like;
};
