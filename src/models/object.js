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
          Object.belongsTo(models.User, {foreignKey : 'UserId'});
          Object.belongsTo(models.Place, {foreignKey : 'PlaceId'});
          Object.hasMany(models.Tag, {foreignKey : 'ObjectId'});
        };

  return Object;
};