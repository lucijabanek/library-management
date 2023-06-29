const { body } = require('express-validator');
module.exports.librarianValidations = [
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
];
