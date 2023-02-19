'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Places', {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Places');
  }
};