/* eslint-disable quotes */
'use strict';
const bcrypt = require('bcryptjs');
const hashPassword = (pass) => {
  const password = bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
  return password;
};
const { roles } = require('../../utils/constant-values');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
    INSERT INTO "user" (id, first_name, last_name, email, password, role_id, created_at, updated_at)
      VALUES 
        ('d1e440bd-54b0-48f9-af8c-3b5f768b8243', 'admin', 'admin', 'admin@gmail.com', '${hashPassword('admin')}', '${roles.admin}', NOW(), NOW())
    `
    );

    await queryInterface.sequelize.query(`
    INSERT INTO "admin" (id, user_id, created_at, updated_at)
      VALUES 
        ('b32d7973-7c7d-474f-a8c9-0187b4fecd8d', 'd1e440bd-54b0-48f9-af8c-3b5f768b8243', NOW(), NOW())
    `
    );
  },

  async down (queryInterface, _Sequelize) {
    queryInterface.sequelize.query(`DELETE FROM "admin" WHERE "id" = 'b32d7973-7c7d-474f-a8c9-0187b4fecd8d'`);
    queryInterface.sequelize.query(`DELETE FROM "user" WHERE "id" = 'd1e440bd-54b0-48f9-af8c-3b5f768b8243'`);
  }

};
