const models = require('../database/models');
const nodemailer = require('nodemailer');

exports.retrieveNotifications = async (object, notifName) => {
  const notification = await models.Notification.count({
    where: {
      objectId: object.id,
      name: notifName
    }
  });
  return notification;
};

exports.addNotificationToDatabase = async (object, notifName) => {
  const notification = await models.Notification.create({
    name: notifName,
    objectId: object.id
  });
  return notification;
};

const replaceMailText = (mailData, mailTemplate) => {
  let cleanedMail = mailTemplate;
  Object.keys(mailData).forEach(el => {
    cleanedMail = cleanedMail.replace(`{{${el}}}`, mailData[el]);
  });
  return cleanedMail;
};

exports.createMail = (mailData) => {
  const { receiverEmail, data, mailTemplate } = mailData;
  const mail = {
    from: 'library@no-reply.com',
    to: receiverEmail,
    subject: replaceMailText(data, mailTemplate.subject),
    html: replaceMailText(data, mailTemplate.body)

  };
  return mail;
};

exports.createTransport = () => nodemailer.createTransport({
  host: process.env.NOTIFICATION_MAILER_HOST,
  port: process.env.NOTIFICATION_MAILER_PORT,
  secure: false
});
