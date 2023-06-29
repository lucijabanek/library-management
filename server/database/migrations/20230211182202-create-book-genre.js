'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('book_genre', {
      genre_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'genre',
          field: 'id'
        }
      },
      book_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'book',
          field: 'id'
        }
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('book_genre');
  }
};
