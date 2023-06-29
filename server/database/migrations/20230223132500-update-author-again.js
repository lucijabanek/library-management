'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('author', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.changeColumn('author', 'date_of_birth', {
      type: Sequelize.DATEONLY
    });
  },
  async down (_queryInterface, _Sequelize) {
  }
};
