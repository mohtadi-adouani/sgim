'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {


    const Place = sequelize.define('Place', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            onDelete: 'cascade', // setting onDelete to cascade
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

        // association User
        UserId: {
            type: Sequelize.UUID,
        },
        // association tags
        TagId: {
            type: Sequelize.UUID,
        },
        // association places (self)
        parentId: {
            type: Sequelize.UUID,
        },
        });
    Place.associate = function (models) {
        Place.belongsTo(models.User, {foreignKey : 'UserId', as: 'Owner'});
        Place.belongsToMany(models.User, {through : 'UserPlacerWriter' ,as: 'Writer'});
        Place.belongsToMany(models.User, {through : 'UserPlacerReader' , as: 'Reader'});

        Place.hasMany(models.Object, {foreignKey : 'PlaceId'});
        Place.belongsToMany(models.Tag,{through : 'TagsPlaces'});

        Place.hasMany(models.Place,{foreignKey : "parentId", as: 'Child'});
        Place.belongsTo(models.Place, {foreignKey : "parentId", as: 'Parent'});
      };
  return Place;
};