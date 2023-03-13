'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Object = sequelize.define('Object',{
      id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
      },
      name: {
          type: Sequelize.STRING
      },
      description: {
          type: Sequelize.STRING
      },
      status_public : {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      // association users
      UserId: {
          type: Sequelize.UUID,
      },
      // association places
      PlaceId: {
          type: Sequelize.UUID,
      },
  });

      Object.associate = function (models) {
          Object.belongsTo(models.User, {foreignKey : 'UserId', as : 'Owner'});
          Object.belongsToMany(models.User, {through: 'UserObjectWriter', as : 'Writer'});
          Object.belongsToMany(models.User, {through: 'UserObjectReader', as : 'Reader'});

          Object.belongsTo(models.Place, {foreignKey : 'PlaceId'});

          Object.belongsToMany(models.Tag, {through : 'TagsObjects'});
        };

  return Object;
};