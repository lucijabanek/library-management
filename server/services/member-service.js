const { Op } = require('sequelize');
const models = require('../database/models');
const { DAY_TO_MS } = require('../utils/constant-values');
const responseMessage = require('../utils/constant-messages');
const { errors } = require('../utils/errors');

exports.getMembersWithExpiringMemberships = async (numOfDays) => {
  const users = await models.Member.findAll({
    where: {
      subscriptionExpirationDate: {
        [Op.lt]: new Date((new Date()).setUTCHours(0, 0, 0, 0) + numOfDays * DAY_TO_MS)
      }
    },
    include: models.User
  });
  return users;
};

exports.retrieveMember = async (id) => {
  const member = await models.Member.findOne({
    where: { id },
    attributes: { exclude: ['password'] }
  });
  if (!member) throw errors.NOT_FOUND(responseMessage.notFound(models.Member.name));
  return member;
};

const updateAndSaveUserWithNewSubscriptionExpiration = async (newSubscriptionExpirationDate, model) => {
  const [affectedRows, _updatedModel] = await models.Member.update({
    subscriptionExpirationDate: newSubscriptionExpirationDate,
    history: model.history
  },
  { where: { id: model.id } }
  );
  return affectedRows;
};

const sortMemberHistory = (history) => {
  history = history.sort((a, b) => {
    return new Date(b.end) - new Date(a.end);
  });
  return history;
};

const calculateNewSubscriptionStartDate = (history) => {
  let newSubscriptionStartDate;
  if (history > 1) {
    newSubscriptionStartDate = new Date(history[1].end) <= new Date()
      ? new Date().toISOString().substr(0, 10)
      : new Date(history[1].end).toISOString().substr(0, 10);
  } else {
    newSubscriptionStartDate = new Date().toISOString().substr(0, 10);
  }
  return newSubscriptionStartDate;
};

exports.addNewExpirationDate = async (member, newSubscriptionExpirationDate) => {
  const newSubscriptionDate = member.subscriptionExpirationDate <= new Date()
    ? new Date().toISOString().substr(0, 10)
    : new Date(member.subscriptionExpirationDate).toISOString().substr(0, 10);

  if (new Date(newSubscriptionExpirationDate) <= new Date(member.subscriptionExpirationDate)) {
    throw errors.VALIDATION(responseMessage.invalidSubscriptionExpirationDate);
  }

  const newHistoryData = { start: newSubscriptionDate, end: newSubscriptionExpirationDate };
  member.history ? member.history.unshift(newHistoryData) : member.history = [newHistoryData];
  const updatedModel = await updateAndSaveUserWithNewSubscriptionExpiration(newSubscriptionExpirationDate, member);
  if (!updatedModel) throw errors.NOT_FOUND(responseMessage.notFound(member.name));
};

exports.updateLastExpirationDate = async (member, newSubscriptionExpirationDate) => {
  if (!member.history.length) throw errors.VALIDATION(responseMessage.subscriptionHistoryError);
  member.history = sortMemberHistory(member.history);

  newSubscriptionExpirationDate = new Date(newSubscriptionExpirationDate).toISOString().substr(0, 10);

  const newSubscriptionStartDate = calculateNewSubscriptionStartDate(member.history);

  if (newSubscriptionExpirationDate <= newSubscriptionStartDate) throw errors.VALIDATION(responseMessage.invalidSubscriptionExpirationDate);

  const newHistoryData = { start: newSubscriptionStartDate, end: newSubscriptionExpirationDate };

  member.history.shift();
  member.history.unshift(newHistoryData);

  const updatedModel = await updateAndSaveUserWithNewSubscriptionExpiration(newSubscriptionExpirationDate, member);
  if (!updatedModel) throw errors.NOT_FOUND(responseMessage.notFound(member.name));
};

exports.deleteLastExpiration = async (member) => {
  if (member.history.length < 2) throw errors.VALIDATION(responseMessage.subscriptionHistoryError);
  member.history = sortMemberHistory(member.history);

  member.history.shift();
  const newSubscriptionExpirationDate = member.history[0].end;

  const updatedModel = await updateAndSaveUserWithNewSubscriptionExpiration(newSubscriptionExpirationDate, member);
  if (!updatedModel) throw errors.NOT_FOUND(responseMessage.notFound(member.name));
};
