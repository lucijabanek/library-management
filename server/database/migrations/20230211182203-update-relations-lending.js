'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('lending', 'member_id', {
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
      references: {
        model: 'member',
        field: 'id'
      }
    });
    await queryInterface.changeColumn('lending', 'book_id', {
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID,
      references: {
        model: 'book',
        field: 'id'
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('lending', 'member_id');
    await queryInterface.removeColumn('lending', 'book_id');
    await queryInterface.addColumn('lending', 'member_id', {
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID
    });
    await queryInterface.addColumn('lending', 'book_id', {
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      type: Sequelize.UUID
    });
  }
};
