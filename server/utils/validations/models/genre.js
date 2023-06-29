const { body } = require('express-validator');
module.exports.genreValidations = [
  body('name')
    .notEmpty()
    .withMessage('\'Name\' must be provided')
    .isString()
    .withMessage('\'Name\' must be a string')
];
