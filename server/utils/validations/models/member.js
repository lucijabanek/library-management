const { body } = require('express-validator');
module.exports.memberValidations = [
  body('address')
    .notEmpty()
    .withMessage('\'Address\' must be provided')
    .isString()
    .withMessage('\'Address\' must be a string'),
  body('dateOfBirth')
    .notEmpty()
    .withMessage('\'Date of birth\' must be provided')
    .isDate()
    .withMessage('\'Date of birth\' must be a date')
    .custom(value => {
      const enteredDate = new Date(value);
      const todaysDate = new Date();
      if (enteredDate.getFullYear() > (todaysDate.getFullYear() - 1)) {
        throw new Error('Invalid date of birth');
      }
      return true;
    })
];

module.exports.subscriptionDaysValidation = [
  body('date')
    .notEmpty()
    .withMessage('\'Date\' must be provided')
    .isDate()
    .withMessage('\'Date\' must be a valid date format')
];
