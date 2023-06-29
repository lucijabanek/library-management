const { body } = require('express-validator');
module.exports.emailValidation = [
  body('email')
    .notEmpty()
    .withMessage('\'Email\' must be provided')
    .isEmail()
    .withMessage('\'Email\' must be a valid email')
];

module.exports.passwordResetValidation = [
  body('newPassword')
    .notEmpty()
    .withMessage('\'New password\' must be provided')
    .isString()
    .withMessage('\'New password\' must be a string')
    .isLength({ min: 6 })
    .withMessage('\'New password\' must be atleast 6 characters long')
];
