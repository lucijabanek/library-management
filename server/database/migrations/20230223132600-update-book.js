'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('book', 'isbn', {
      type: Sequelize.STRING,
      unique: true
    });
  },
  async down (_queryInterface, _Sequelize) {
  }
};
