const { callbackErrorHandler } = require('../middleware/error-handlers');
const models = require('../database/models');
const responseMessage = require('../utils/constant-messages');
const { errors } = require('../utils/errors');
const { calculateLateFee, calculateCurrentLateFee } = require('../utils/calculate-fee');
const { roles, excludedFields } = require('../utils/constant-values');
const { getPagination, getPagingData } = require('../utils/pagination');

module.exports.createLending = () => {
  return callbackErrorHandler(async (req, res) => {
    const { actionId: id, memberId, bookId } = req.body;

    const lendingData = { id, memberId, bookId };

    try {
      await models.Lending.create(lendingData);

      return res.status(201).json({
        message: responseMessage.createSuccess(models.Lending.name)
      });
    } catch (error) {
      if (error.original.constraint === 'lending_pkey') {
        return res.status(201).json({
          message: responseMessage.createSuccess(models.Lending.name)
        });
      }

      throw error;
    }
  });
};

module.exports.bookReturn = () => {
  return callbackErrorHandler(async (req, res) => {
    const { id } = req.params;

    const lending = await models.Lending.findByPk(id);

    if (!lending) {
      throw errors.NOT_FOUND(responseMessage.notFound(models.Lending.name));
    }

    if (!lending.isActive) {
      throw errors.VALIDATION(responseMessage.returnedBook);
    }

    const calculatedFee = calculateLateFee(lending.expiredDate);

    const newLendingData = {
      returnedDate: new Date(),
      isActive: false,
      lateFee: calculatedFee
    };

    const [_updatedRows, updatedInstances] = await models.Lending.update(newLendingData, {
      where: { id },
      returning: true
    });

    return res.status(200).json({
      message: responseMessage.bookSuccessfullyReturned,
      lateFee: updatedInstances[0].lateFee
    });
  });
};

module.exports.getMemberLendings = () => {
  return callbackErrorHandler(async (req, res) => {
    const { isActive, page, size, mId: queryId } = req.query;
    const { role, id: authId } = req.authData;

    const { limit, offset } = getPagination(page, size);

    let memberId;

    if (role === roles.member) {
      memberId = authId;
    } else {
      memberId = queryId;
      if (!memberId) throw errors.VALIDATION(responseMessage.invalidIdType);
    }

    const options = {
      where: { memberId },
      limit,
      offset,
      order: [['lentDate', 'DESC']],
      attributes: { exclude: ['id', 'memberId', 'bookId', 'createdAt', 'updatedAt'] },
      include: [{
        model: models.Book,
        attributes: { exclude: excludedFields.book }
      }]
    };

    if (role === roles.admin || role === roles.librarian) {
      options.include.push({
        model: models.Member,
        include: {
          model: models.User,
          attributes: { exclude: excludedFields.user }
        },
        attributes: { exclude: excludedFields.member }
      }
      );
    }

    if (isActive) {
      options.where = { memberId, isActive };
    }

    let membersLendings = await models.Lending.findAndCountAll(options);

    membersLendings = getPagingData(membersLendings, page, limit);

    calculateCurrentLateFee(membersLendings.modelRows);

    return res.status(200).json({
      data: membersLendings
    });
  });
};

module.exports.getAllLendings = () => {
  return callbackErrorHandler(async (req, res) => {
    const { page, size, isActive } = req.query;
    const { limit, offset } = getPagination(page, size);

    const options = {
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      include: [{
        model: models.Book,
        attributes: { exclude: excludedFields.book }
      }, {
        model: models.Member,
        include: {
          model: models.User,
          attributes: { exclude: excludedFields.user }
        },
        attributes: { exclude: excludedFields.member }
      }]
    };

    if (isActive) {
      options.where = { isActive };
    }

    let lendings = await models.Lending.findAndCountAll(options);

    lendings = getPagingData(lendings, page, limit);

    calculateCurrentLateFee(lendings.modelRows);

    return res.status(200).json({
      data: lendings
    });
  });
};
