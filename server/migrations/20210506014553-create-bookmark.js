'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookmarks', {
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      accommodationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Accommodation',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    await queryInterface.addConstraint('Bookmarks', {
      type: 'primary key',
      name: 'bookmark_pkey',
      fields: ['customerId', 'accommodationId']
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookmarks');
  }
};