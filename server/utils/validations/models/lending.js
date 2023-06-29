const { body } = require('express-validator');

module.exports.lendingValidations = [
  body('actionId')
    .exists()
    .withMessage('\'actionId\' must be provided')
    .isUUID()
    .withMessage('\':actionId\' must be a uuid'),
  body('memberId')
    .exists()
    .withMessage('\'memberId\' must be provided')
    .isUUID()
    .withMessage('\'memberId\' must be a uuid'),
  body('bookId')
    .exists()
    .withMessage('\'bookId\' must be provided')
    .isUUID()
    .withMessage('\'bookId\' must be a uuid'),
  body('lentDate')
    .not()
    .exists()
    .withMessage('Cannot set property of \'lentDate\''),
  body('expiredDate')
    .not()
    .exists()
    .withMessage('Cannot set property of \'expiredDate\''),
  body('returnedDate')
    .not()
    .exists()
    .withMessage('Cannot set property of \'returnedDate\''),
  body('lateFee')
    .not()
    .exists()
    .withMessage('Cannot set property of \'lateFee\''),
  body('isActive')
    .not()
    .exists()
    .withMessage('Cannot set property of \'isActive\'')
];
