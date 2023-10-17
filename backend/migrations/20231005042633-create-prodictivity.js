'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Prodictivitie', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false,references: {
          model: 'User',
          key: 'id',
        },
      },
      dateOfEntry: {
        type: Sequelize.DATE,
        allowNull: false
      },
      subjects: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify([])
      },
      timing: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify([])
      },
      productivity: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    // Adding a foreign key constraint
    await queryInterface.addConstraint('Prodictivitie', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Prodictivitie_user_id_fk',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Prodictivitie');
  }
};