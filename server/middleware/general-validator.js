const { validationResult } = require('express-validator');

const { errors } = require('../utils/errors');

const customErrorFormatter = ({ msg, param, location }) => ({
  msg,
  param,
  location
});

module.exports.generalValidator = (validations) => {
  return async function (req, res, next) {
    await Promise.all(validations.map(validation => validation.run(req)));

    const result = validationResult(req).formatWith(customErrorFormatter);

    if (!result.isEmpty()) {
      return next(errors.VALIDATION(result.array()));
    }

    return next();
  };
};
