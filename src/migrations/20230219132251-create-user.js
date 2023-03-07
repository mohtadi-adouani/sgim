'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
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
      // // association places
      // PlaceOwnerId: {
      //     type: Sequelize.UUID,
      // },
      // // association places
      // PlaceWriterId: {
      //     type: Sequelize.UUID,
      // },
      // // association places
      // PlaceReaderId: {
      //     type: Sequelize.UUID,
      // },
      // association objects
      ObjectId: {
        type: Sequelize.UUID,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UsersObjects');
    await queryInterface.dropTable('UsersPlaces');
    await queryInterface.dropTable('UserPlacerWriter');
    await queryInterface.dropTable('UserPlacerReader');
    await queryInterface.dropTable('Users');
  }
};