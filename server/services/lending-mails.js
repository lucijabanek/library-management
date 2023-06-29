const mailService = require('./mail-service');
const mailText = require('../utils/mails');
const { getExpiringLendings } = require('./lending-service');
const { calculateNumberOfDaysLate, calculateLateFee } = require('../utils/calculate-fee');
const { PRICE_PER_DAY } = require('../utils/constant-values');

const sendLendingDueDateEmails = async (lendings) => {
  const transport = mailService.createTransport();

  await Promise.all(lendings.map(async (lending) => {
    try {
      const daysLate = calculateNumberOfDaysLate(lending.expiredDate);
      const notificationName = `due_date_${daysLate}_${lending.id}`;
      const notification = await mailService.retrieveNotifications(lending, notificationName);

      if (!notification) {
        const member = lending.Member;

        const data = {
          username: lending.Member.User.firstName,
          bookName: lending.Book.title,
          price: (PRICE_PER_DAY).toFixed(2),
          expiredDate: lending.expiredDate,
          lateFee: calculateLateFee(lending.expiredDate)
        };

        const mailTemplate = daysLate === 0
          ? mailText.dueDateEmail
          : daysLate > 0
            ? mailText.dueDateExceededEmail
            : mailText.oneDayReminderEmail;

        const mailData = { receiverEmail: member.User.email, data, mailTemplate };

        const mail = mailService.createMail(mailData);

        await transport.sendMail(mail);

        await mailService.addNotificationToDatabase(lending, notificationName);
      }
    } catch (error) {
      console.error(`Error sending email to user ${lending.Member.id}:`, error);
    }
  }));
};

exports.sendAll = async () => {
  const lendings = await getExpiringLendings();
  sendLendingDueDateEmails(lendings);
};
