'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Objects', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        onDelete: 'cascade', // setting onDelete to cascade
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status_public : {
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
      // association users
      UserId: {
        type: Sequelize.UUID,
      },
      // association places
      PlaceId: {
        type: Sequelize.UUID,
      },
      // // association tags
      // TagId: {
      //     type: Sequelize.UUID,
      // }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TagsObjects');
    await queryInterface.dropTable('UsersObjects');

    await queryInterface.dropTable('UserObjectReader');
    await queryInterface.dropTable('UserObjectWriter');
    await queryInterface.dropTable('Objects');
  }
};