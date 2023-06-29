'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.renameColumn('lending', 'action_id', 'id');
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.renameColumn('lending', 'id', 'action_id');
  }
};
