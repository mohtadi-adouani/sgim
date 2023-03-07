'use strict';
const { Sequelize } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User',{
      id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          onDelete: 'cascade', // setting onDelete to cascade
      },
      username: {
          allowNull: false,
          type: Sequelize.STRING
      },
      email: {
          allowNull: false,
          type: Sequelize.STRING
      },
      password: {
          allowNull: false,
          type: Sequelize.STRING
      },
      isAdmin: {
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
      ObjectId: {
          type: Sequelize.UUID,
      }
  });

  User.associate = function (models) {
      User.hasMany(models.Place, {foreignKey : 'UserId', as : 'Oplace'});
      User.belongsToMany(models.Place, {through: 'UserPlacerWriter', as : 'Wplace'});
      User.belongsToMany(models.Place, {through: 'UserPlacerReader', as : 'Rplace'});
      User.hasMany(models.Object);
    };
  return User;
};