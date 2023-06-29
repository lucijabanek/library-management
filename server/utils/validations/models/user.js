const { body } = require('express-validator');
module.exports.userValidations = [
  body('firstName')
    .notEmpty()
    .withMessage('\'First name\' must be provided')
    .isString()
    .withMessage('\'First name\' must be a string'),
  body('lastName')
    .notEmpty()
    .withMessage('\'Last name\' must be provided')
    .isString()
    .withMessage('\'Last name\' must be a string'),
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
    .isLength({ min: 6 })
    .withMessage('\'Password\' must be atleast 6 characters long')
];
