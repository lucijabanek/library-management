'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('author', 'created_at');
    await queryInterface.removeColumn('author', 'updated_at');
    await queryInterface.removeColumn('book', 'created_at');
    await queryInterface.removeColumn('book', 'updated_at');
    await queryInterface.removeColumn('genre', 'created_at');
    await queryInterface.removeColumn('genre', 'updated_at');
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('author', 'created_at', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('author', 'updated_at', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('book', 'created_at', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('book', 'updated_at', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('genre', 'created_at', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('genre', 'updated_at', {
      type: Sequelize.DATE
    });
  }
};
