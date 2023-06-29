'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('member', 'subscription_expiration_date', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
    await queryInterface.addColumn('member', 'history', {
      type: Sequelize.JSONB
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('member', 'subscription_expiration_date');
    await queryInterface.removeColumn('member', 'history');
  }
};
