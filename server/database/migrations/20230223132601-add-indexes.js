'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    await queryInterface.addIndex('author', ['name'], {
      name: 'idx_author_name'
    });
    await queryInterface.addIndex('genre', ['name'], {
      name: 'idx_genre_name'
    });
    await queryInterface.addIndex('book', ['author_id'], {
      name: 'idx_book_author_id'
    });
    await queryInterface.addIndex('notification', ['object_id', 'name'], {
      name: 'idx_notification_object'
    });
  },
  async down (_queryInterface, _Sequelize) {
  }
};
