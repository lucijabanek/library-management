const models = require('../database/models');
const { callbackErrorHandler } = require('../middleware/error-handlers');
const responseMessage = require('../utils/constant-messages');
const userController = require('./user-controller');
const memberService = require('../services/member-service');

exports.updateMember = () => {
  return callbackErrorHandler(async function (req, res) {
    const { userId } = req.params;
    const { firstName, lastName, address, dateOfBirth } = req.body;
    const userData = { firstName, lastName };
    const memberData = { address, dateOfBirth };

    await userController.updateUser(models.Member, userId, userData, memberData);
    return res.status(200).json({ message: responseMessage.updateSuccess(models.Member.name) });
  });
};

exports.addNewSubscription = () => {
  return callbackErrorHandler(async function (req, res) {
    const member = await memberService.retrieveMember(req.params.id);
    const newExpirationDate = req.body.date;

    await memberService.addNewExpirationDate(member, newExpirationDate);

    return res.status(201).json({ message: responseMessage.updateSubscriptionSuccess });
  });
};

exports.updateLastSubscription = () => {
  return callbackErrorHandler(async function (req, res) {
    const member = await memberService.retrieveMember(req.params.id);
    const newExpirationDate = req.body.date;

    await memberService.updateLastExpirationDate(member, newExpirationDate);

    return res.status(200).json({ message: responseMessage.updateSubscriptionSuccess });
  });
};

exports.deleteLastSubscription = () => {
  return callbackErrorHandler(async function (req, res) {
    const member = await memberService.retrieveMember(req.params.id);

    await memberService.deleteLastExpiration(member);

    return res.status(204).json({ message: responseMessage.subscriptionDeleteSuccess });
  });
};
