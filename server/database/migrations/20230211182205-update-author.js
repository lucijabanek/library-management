'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('author', 'date_of_birth', {
      type: Sequelize.DATE
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('author', 'date_of_birth');
  }
};
