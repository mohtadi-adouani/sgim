'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TagsPlaces');
    await queryInterface.dropTable('TagsObjects');
    await queryInterface.dropTable('Tags');
  }
};