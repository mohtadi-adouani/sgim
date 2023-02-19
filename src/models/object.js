'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Object = sequelize.define('Object',{
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
          name: {
            type: Sequelize.STRING
          },
          description: {
            type: Sequelize.STRING
          },
          place_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references : {
              model : 'Place',
              key : 'id'
            }
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

      Object.associate = function (models) {
          Object.belongsTo(models.User, {foreignKey: 'id'});
          Object.belongsTo(models.Place, {foreignKey: 'id'});
        };

  return Object;
};