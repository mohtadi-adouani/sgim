'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {


    const Place = sequelize.define('Place', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
        },
        status_public : {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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
        // association objects
        ObjectId: {
            type: Sequelize.UUID,
        },
        // association tags
        TagId: {
            type: Sequelize.UUID,
        }
        });
    Place.associate = function (models) {
        Place.belongsToMany(models.User, {through: 'UsersPlaces'});
        Place.hasMany(models.Object);
        Place.hasMany(models.Tag);
      };
  return Place;
};