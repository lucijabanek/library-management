'use strict';
const { DAY_TO_MS } = require('../../utils/constant-values');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, _Sequelize) {
    const data =
      {
        id: 'f5bebb04-497c-4790-bea1-7800a4f19db7',
        address: 'Member address 1',
        date_of_birth: '1999-09-22',
        user_id: 'c07c0c3a-044c-4b17-8bbc-8d5f3b183a2b',
        subscription_expiration_date: new Date(Date.now() + 30 * DAY_TO_MS),
        created_at: new Date(),
        updated_at: new Date()
      };
    const history = [
      { start: new Date().toISOString().substr(0, 10), end: new Date(Date.now() + 30 * DAY_TO_MS).toISOString().substr(0, 10) }
    ];
    const values = JSON.stringify(history);
    const query = `
    INSERT INTO "member" 
      ("id", "address", "date_of_birth", "user_id", "subscription_expiration_date", "history", "created_at", "updated_at") 
        VALUES (
          '${data.id}', 
          '${data.address}', 
          '${data.date_of_birth}', 
          '${data.user_id}', 
          '${data.subscription_expiration_date.toISOString().substr(0, 10)}', 
          '${values}'::jsonb, 
          '${data.created_at.toISOString()}', 
          '${data.updated_at.toISOString()}'
      )
    `;
    await queryInterface.sequelize.query(query);
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('member', null, {});
  }
};
