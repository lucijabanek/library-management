const { body } = require('express-validator');

module.exports.generalValidations = [
  body('id')
    .not()
    .exists()
    .withMessage('Cannot set property of \'id\''),
  body('created_at')
    .not()
    .exists()
    .withMessage('Cannot set property of \'created_at\''),
  body('updated_at')
    .not()
    .exists()
    .withMessage('Cannot set property of \'updated_at\'')
];
