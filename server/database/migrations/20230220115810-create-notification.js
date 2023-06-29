'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notification', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      object_id: {
        type: Sequelize.UUID,
        allowNull: false
      }
    });
  },
  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('notification');
  }
};
