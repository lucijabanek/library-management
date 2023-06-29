'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    return queryInterface.bulkInsert('librarian', [
      {
        id: '8f526609-d6f2-43e5-8e30-3785940df230',
        address: 'Librarian address 1',
        date_of_birth: '1990-09-22',
        user_id: 'a84d2fdd-40b5-4ac8-91c8-85d864e7b437',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('librarian', null, {});
  }
};
