const { param } = require('express-validator');

module.exports.paramValidations = [
  param('id')
    .exists()
    .withMessage('\':id\' must be provided')
    .isUUID()
    .withMessage('\':id\' must be a uuid')
];

module.exports.userIdValidation = [
  param('userId')
    .notEmpty()
    .withMessage('\':userId\' must be provided')
    .isUUID()
    .withMessage('\':userId\' must be a uuid')
];
