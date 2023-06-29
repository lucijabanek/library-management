'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('book', 'title', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.removeColumn('book', 'year_of_release');
    await queryInterface.addColumn('book', 'date_of_release', {
      type: Sequelize.DATEONLY,
      allowNull: false
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('book', 'title');
    await queryInterface.removeColumn('book', 'date_of_release');
    await queryInterface.addColumn('book', 'year_of_release', {
      type: Sequelize.DATEONLY
    });
  }
};
