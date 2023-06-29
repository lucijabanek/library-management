const { body } = require('express-validator');
module.exports.loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('\'Email\' must be provided')
    .isEmail()
    .withMessage('\'Email\' must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('\'Password\' must be provided')
    .isString()
    .withMessage('\'Password\' must be a string')
];
