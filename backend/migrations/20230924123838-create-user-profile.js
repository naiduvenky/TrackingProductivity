'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserProfile', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      profilePictureURL: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobileNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adharNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
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
     await queryInterface.addConstraint('UserProfile', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'user_profile_user_id_fk',
      references: {
        table: 'User',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserProfile');
  }
};