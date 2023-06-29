'use strict';
const { roles } = require('../../utils/constant-values');

const bcrypt = require('bcryptjs');
const hashPassword = (pass) => {
  const password = bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
  return password;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('user', [
      {
        id: 'a84d2fdd-40b5-4ac8-91c8-85d864e7b437',
        first_name: 'librarian',
        last_name: 'librarian',
        email: 'librarian@gmail.com',
        password: hashPassword('librarian'),
        role_id: roles.librarian,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'c07c0c3a-044c-4b17-8bbc-8d5f3b183a2b',
        first_name: 'member',
        last_name: 'member',
        email: 'member@gmail.com',
        password: hashPassword('member'),
        role_id: roles.member,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
