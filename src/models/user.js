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
      // association places
      PlaceId: {
          type: Sequelize.UUID,
      },
      // association objects
      ObjectId: {
          type: Sequelize.UUID,
      }
  });

  User.associate = function (models) {
      User.hasMany(models.Place);
      User.hasMany(models.Object);
    };
  return User;
};