'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('member', 'subscription_expiration_date', {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    });
  },
  async down (_queryInterface, _Sequelize) {}
};
