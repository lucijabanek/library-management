const { PasswordReset } = require('../database/models');
const mailService = require('./mail-service');
const mailText = require('../utils/mails');
const { Op } = require('sequelize');

exports.deleteResetToken = async (userId) => {
  await PasswordReset.destroy({
    where: { userId }
  });
};

exports.createResetToken = async (data) => {
  await PasswordReset.create(data);
};

exports.deleteExpiredTokens = async () => {
  await PasswordReset.destroy({
    where: {
      expirationTime: {
        [Op.lt]: new Date()
      }
    }
  });
};

exports.sendPasswordResetLink = async (data) => {
  const transport = mailService.createTransport();

  const mailTemplate = mailText.passwordReset;

  // create email with all needed data
  data.baseurl = process.env.RESET_PASSWORD_URL;
  const mailData = { receiverEmail: data.email, data, mailTemplate };
  const mail = mailService.createMail(mailData);

  await transport.sendMail(mail);
};

exports.sendPasswordChangeEmail = async (email) => {
  const transport = mailService.createTransport();

  const mailTemplate = mailText.passwordChangeSuccess;

  // create email with all needed data
  const mailData = { receiverEmail: email, data: {}, mailTemplate };
  const mail = mailService.createMail(mailData);

  await transport.sendMail(mail);
};
