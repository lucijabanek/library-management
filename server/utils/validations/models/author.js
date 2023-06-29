const { body } = require('express-validator');
module.exports.authorValidations = [
  body('name')
    .notEmpty()
    .withMessage('\'Name\' must be provided')
    .isString()
    .withMessage('\'Name\' must be a string'),
  body('dateOfBirth')
    .optional(true)
    .notEmpty()
    .withMessage('\'dateOfBirth\' cannot be empty')
    .isDate()
    .withMessage('\'dateOfBirth\' must be a date (date format: YYYY-MM-DD')
];
