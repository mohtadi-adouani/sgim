'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Places', {
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
      // // association objects
      // PlaceOwnerId: {
      //     type: Sequelize.UUID,
      // },
      // PlaceWriterId: {
      //     type: Sequelize.UUID,
      // },
      // PlaceReaderId: {
      //     type: Sequelize.UUID,
      // },
      // association tags
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TagsPlaces');
    await queryInterface.dropTable('UsersPlaces');
    await queryInterface.dropTable('UserPlacerWriter');
    await queryInterface.dropTable('UserPlacerReader');
    await queryInterface.dropTable('Places');
  }
};