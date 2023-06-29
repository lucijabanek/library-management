'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('book', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      year_of_release: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      tags: {
        type: Sequelize.JSONB
      },
      author_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'author',
          field: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('book');
  }
};
