const { body } = require('express-validator');
module.exports.bookValidations = [
  body('isbn')
    .optional(true)
    .notEmpty()
    .withMessage('\'ISBN\' cannot be empty'),
  body('title')
    .notEmpty()
    .withMessage('\'Title\' must be provided')
    .isString()
    .withMessage('\'Title\' must be a string'),
  body('dateOfRelease')
    .notEmpty()
    .withMessage('\'dateOfRelease\' must be provided')
    .isDate()
    .withMessage('\'dateOfRelease\' must be a date (date format: YYYY-MM-DD'),
  body('tags')
    .optional(true)
    .notEmpty()
    .withMessage('\'tags\' cannot be empty')
    .isArray({ min: 1 })
    .withMessage('\'tags\' must be an array of strings (example: [\'string1\', \'string2\'])'),
  body('tags.*')
    .optional(true)
    .isString()
    .withMessage('Value inside \'tags\' must be a string)'),
  body('authorId')
    .notEmpty()
    .withMessage('\'authorId\' must be provided')
    .isUUID()
    .withMessage('\'authorId\' must be a uuid')
];

module.exports.bookWithISBNValidations = [
  body('isbn')
    .notEmpty()
    .withMessage('\'ISBN\' must be provided')
];
