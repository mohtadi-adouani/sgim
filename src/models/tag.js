'use strict';
const { Sequelize } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define('Tag',{
      id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
      },
      name: {
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
      // association places
      PlaceId: {
          type: Sequelize.UUID,
      },
      // association objects
      ObjectId: {
          type: Sequelize.UUID,
      }
  });

  Tag.associate = function (models) {
      Tag.belongsToMany(models.Place, {through: 'TagsPlaces'});
      // Tag.belongsToMany(models.Place, {through: 'TagsPlaces', foreignKey: 'PlaceId'});
      // Tag.belongsToMany(models.Object, {through: 'TagsObjects', foreignKey: 'ObjectId'});
      Tag.belongsToMany(models.Object, {through: 'TagsObjects'});
    };
  return Tag;
};
