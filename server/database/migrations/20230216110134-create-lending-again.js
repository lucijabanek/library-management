'use strict';

const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('lending');
    await queryInterface.createTable('lending', {
      action_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID
      },
      member_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'member',
          field: 'id'
        }
      },
      book_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'book',
          field: 'id'
        }
      },
      lent_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      expired_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      returned_date: {
        type: Sequelize.DATEONLY
      },
      late_fee: {
        type: Sequelize.DECIMAL
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('lending');
    await queryInterface.createTable('lending', {
      action_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      member_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'member',
          field: 'id'
        }
      },
      book_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'book',
          field: 'id'
        }
      },
      lent_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW
      },
      expired_date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: moment().add(15, 'days').toDate()
      },
      returned_date: {
        type: Sequelize.DATEONLY
      },
      late_fee: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.25
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  }
};
