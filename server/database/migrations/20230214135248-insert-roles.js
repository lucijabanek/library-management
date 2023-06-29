/* eslint-disable quotes */
'use strict';
const { roles } = require('../../utils/constant-values');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO ROLE (id, name) 
      values 
        ('${roles.admin}', 'admin'), 
        ('${roles.librarian}', 'librarian'), 
        ('${roles.member}', 'member')
    `
    );
  },

  async down (queryInterface, _Sequelize) {
    queryInterface.sequelize.query(`DELETE FROM role WHERE name='${roles.admin}'`);
    queryInterface.sequelize.query(`DELETE FROM role WHERE name='${roles.librarian}'`);
    queryInterface.sequelize.query(`DELETE FROM role WHERE name='${roles.member}'`);
  }
};
