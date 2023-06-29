'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('member', 'book_limit', {
      type: Sequelize.INTEGER,
      defaultValue: null
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('member', 'book_limit');
  }
};
