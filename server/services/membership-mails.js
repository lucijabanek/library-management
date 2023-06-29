const mailService = require('./mail-service');
const mailText = require('../utils/mails');
const memberService = require('./member-service');
const { DAY_TO_MS } = require('../utils/constant-values');

const calculateDaysLate = (member) => {
  const daysLate = new Date(member.subscriptionExpirationDate) <= new Date((new Date()).setUTCHours(0, 0, 0, 0))
    ? 0
    : (new Date(member.subscriptionExpirationDate) <= new Date(new Date()).setUTCHours(0, 0, 0, 0) + DAY_TO_MS)
        ? 1
        : 7;
  return daysLate;
};

const sendMembershipReminder = async (members) => {
  const transport = mailService.createTransport();

  await Promise.all(members.map(async (member) => {
    try {
      const numOfDays = calculateDaysLate(member);
      const notifName = `membership_${numOfDays}days_${member.history.length}`;
      const notification = await mailService.retrieveNotifications(member, notifName);
      if (!notification) {
        const data = { username: member.User.firstName, days: numOfDays };
        const mailTemplate = numOfDays ? mailText.membershipExpirationXDays : mailText.membershipExpirationToday;

        // create email with all needed data
        const mailData = { receiverEmail: member.User.email, data, mailTemplate };
        const mail = mailService.createMail(mailData);
        // send mail to member and save notification to db
        await transport.sendMail(mail);
        await mailService.addNotificationToDatabase(member, notifName);
      }
    } catch (error) {
      console.error(`Error sending email to user ${member.id}:`, error);
    }
  }));
};

exports.sendAll = async () => {
  const members7Day = await memberService.getMembersWithExpiringMemberships(7);
  await sendMembershipReminder(members7Day);
};
