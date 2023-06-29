const { body, param } = require('express-validator');
module.exports.bookGenreValidations = [
  body('genreId')
    .notEmpty()
    .withMessage('\'genreId\' must be provided')
    .isUUID()
    .withMessage('\'genreId\' must be a uuid'),
  body('bookId')
    .notEmpty()
    .withMessage('\'bookId\' must be provided')
    .isUUID()
    .withMessage('\'bookId\' must be a uuid')
];

module.exports.bookGenreParamsValidations = [
  param('genreId')
    .notEmpty()
    .withMessage('\'genreId\' must be provided')
    .isUUID()
    .withMessage('\'genreId\' must be a uuid'),
  param('bookId')
    .notEmpty()
    .withMessage('\'bookId\' must be provided')
    .isUUID()
    .withMessage('\'bookId\' must be a uuid')
];
