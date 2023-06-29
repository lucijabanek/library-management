const { Op } = require('sequelize');
const models = require('../database/models');
const { DAY_TO_MS } = require('../utils/constant-values');

module.exports.getExpiringLendings = async () => {
  const lendings = await models.Lending.findAll({
    where: {
      expiredDate: {
        [Op.lt]: new Date((new Date()).setHours(0, 0, 0, 0) + 2 * DAY_TO_MS)
      },
      isActive: true
    },
    include: [{
      model: models.Book
    }, {
      model: models.Member,
      include: {
        model: models.User
      }
    }]
  });

  return lendings;
};
