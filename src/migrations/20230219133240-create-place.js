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
      },
      // association places (self)
      Place_child_Id: {
        type: Sequelize.UUID,
      },
      // association places (self)
      Place_parent_Id: {
        type: Sequelize.UUID,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Places');
  }
};