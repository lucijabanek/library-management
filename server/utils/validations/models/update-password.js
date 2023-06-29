const { body } = require('express-validator');
module.exports.updatePassword = [
  body('oldPassword')
    .notEmpty()
    .withMessage('\'Old password\' must be provided')
    .isString()
    .withMessage('\'Old password\' must be a string'),
  body('newPassword')
    .notEmpty()
    .withMessage('\'New password\' must be provided')
    .isString()
    .withMessage('\'New password\' must be a string')
    .isLength({ min: 6 })
    .withMessage('\'New password\' must be atleast 6 characters long')
    .custom(async (value, { req }) => {
      if (value === req.body.oldPassword) {
        throw new Error('\'New password\' must be different from \'Old password\'');
      }
      return true;
    })
];
