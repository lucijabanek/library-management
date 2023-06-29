'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('lending', 'member_id', {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'member',
        field: 'id'
      }
    });
    await queryInterface.changeColumn('lending', 'book_id', {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'book',
        field: 'id'
      }
    });
    await queryInterface.addColumn('lending', 'action_id', {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    });
    await queryInterface.changeColumn('lending', 'lent_date', {
      allowNull: false,
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW
    });
    await queryInterface.changeColumn('lending', 'expired_date', {
      allowNull: false,
      type: Sequelize.DATEONLY,
      defaultValue: moment().add(15, 'days').toDate()
    });
    await queryInterface.changeColumn('lending', 'returned_date', {
      type: Sequelize.DATEONLY
    });
    await queryInterface.changeColumn('lending', 'late_fee', {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0.25
    });
    await queryInterface.changeColumn('lending', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('lending', 'member_id', {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      references: {
        model: 'member',
        field: 'id'
      }
    });
    await queryInterface.changeColumn('lending', 'book_id', {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      references: {
        model: 'member',
        field: 'id'
      }
    });
    await queryInterface.removeColumn('lending', 'action_id');
    await queryInterface.changeColumn('lending', 'lent_date', {
      allowNull: false,
      type: Sequelize.DATE
    });
    await queryInterface.changeColumn('lending', 'expired_date', {
      allowNull: false,
      type: Sequelize.DATE
    });
    await queryInterface.changeColumn('lending', 'returned_date', {
      allowNull: false,
      type: Sequelize.DATE
    });
    await queryInterface.changeColumn('lending', 'late_fee', {
      allowNull: false,
      type: Sequelize.INTEGER
    });
    await queryInterface.changeColumn('lending', 'is_active', {
      allowNull: false,
      type: Sequelize.BOOLEAN
    });
  }
};
