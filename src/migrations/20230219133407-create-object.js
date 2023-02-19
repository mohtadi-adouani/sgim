'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Objects', {
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
            model : 'Places',
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Objects');
  }
};