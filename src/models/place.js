'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
//  class Place extends Model {
//    /**
//     * Helper method for defining associations.
//     * This method is not a part of Sequelize lifecycle.
//     * The `models/index` file will call this method automatically.
//     */
//    static associate(models) {
//      // define association here
//      models.Place.belongTo(models.User);
//    }

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
      };
  return Place;
};