'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('member', 'is_active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }, { transaction });
      await queryInterface.addColumn('librarian', 'is_active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }, { transaction });
      await queryInterface.addColumn('admin', 'is_active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }, { transaction });
      await queryInterface.addColumn('author', 'is_active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }, { transaction });
      await queryInterface.addColumn('book', 'is_active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }, { transaction });

      // commit changes if everything was successfull
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.removeColumn('member', 'is_active');
    await queryInterface.removeColumn('librarian', 'is_active');
    await queryInterface.removeColumn('admin', 'is_active');
  }
};
