'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('book', [
      {
        id: '75442486-0878-440c-9db1-a7006c25a393',
        isbn: '1234567890',
        title: 'Book Title 1',
        date_of_release: '1996-01-01',
        author_id: '75442486-0878-440c-9db1-a7006c25a000'
      },
      {
        id: '75442486-0878-440c-9db1-a7006c25a398',
        isbn: '1234567891',
        title: 'Book Title 2',
        date_of_release: '1980-01-10',
        author_id: '75442486-0878-440c-9db1-a7006c25a000'
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('book', null, {});
  }
};
