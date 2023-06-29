const { callbackErrorHandler } = require('./error-handlers');
const models = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/constant-messages');
const { BOOK_LIMIT } = require('../utils/constant-values');

module.exports.checkIsMembershipValid = () => {
  return callbackErrorHandler(async (req, res, next) => {
    const { memberId } = req.body;

    const member = await models.Member.findByPk(memberId);

    if (!member) {
      throw errors.NOT_FOUND(responseMessage.notFound(models.Member.name));
    }

    if (member.subscriptionExpirationDate < new Date()) {
      throw errors.VALIDATION(responseMessage.membershipExpired);
    }

    return next();
  });
};

module.exports.checkIsBookLimitExceeded = () => {
  return callbackErrorHandler(async (req, res, next) => {
    const { memberId } = req.body;

    const member = await models.Member.findByPk(memberId);

    const bookLimit = member.bookLimit || BOOK_LIMIT;

    const lendedBooksCount = await models.Lending.count({
      where: { isActive: true, memberId }
    });

    if (lendedBooksCount >= bookLimit) {
      throw errors.VALIDATION(responseMessage.bookLimitExceeded);
    }

    return next();
  });
};
