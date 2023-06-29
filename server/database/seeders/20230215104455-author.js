'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('author', [
      {
        id: '75442486-0878-440c-9db1-a7006c25a000',
        name: 'author',
        date_of_birth: '1999-01-01'
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('author', null, {});
  }
};
