
const PORT = process.env.PORT || 3000;
const cron = require('node-cron');
const app = require('./app');
const membershipMails = require('./services/membership-mails');
const dueDateMails = require('./services/lending-mails');
const { deleteExpiredTokens } = require('./services/reset-password');

const startApp = function () {
  try {
    app.listen(PORT, () => {
      console.log(`Application started, listening on port ${PORT}...`);
      cron.schedule(process.env.CRON_SCHEDULE, async () => {
        await membershipMails.sendAll();
        await dueDateMails.sendAll();
        await deleteExpiredTokens();
      });
    });
  } catch (error) {
    console.error(error.message);
  }
};
startApp();
