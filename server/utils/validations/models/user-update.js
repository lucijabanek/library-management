const { body } = require('express-validator');
module.exports.userUpdateValidations = [
  body('firstName')
    .notEmpty()
    .withMessage('\'First name\' must be provided')
    .isString()
    .withMessage('\'First name\' must be a string'),
  body('lastName')
    .notEmpty()
    .withMessage('\'Last name\' must be provided')
    .isString()
    .withMessage('\'Last name\' must be a string')
];
