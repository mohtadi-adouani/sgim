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
            owner_id : {
                  type: Sequelize.UUID,
                  allowNull: false,
                  references : {
                    model : 'Users',
                    key : 'id'
                  }
              },
            status_public : {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            shared_with : {
                  type: Sequelize.UUID,
            },
              name: {
                type: Sequelize.STRING
              },
              description: {
                type: Sequelize.STRING
              },
              parentId: {
                type: Sequelize.STRING
              },
              createdAt: {
                allowNull: false,
                type: Sequelize.DATE
              },
              updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
              }
        });
    Place.associate = function (models) {
        Place.belongsTo(models.User, {foreignKey: 'id'});
        Place.hasMany(models.Object, {foreignKey: 'id'});
      };
  return Place;
};