const { query } = require('express-validator');

module.exports.queryValidations = [
  query('include')
    .optional(true)
    .not()
    .isInt()
    .withMessage('Query param \'include\' must be a string')
    .not()
    .isEmpty()
    .withMessage('Query param \'include\' cannot be an empty string'),
  query('page')
    .optional(true)
    .isInt({ min: 0 })
    .withMessage('Value after \'page\' must be a positive integer')
    .notEmpty()
    .withMessage('Query param \'page\' cannot be empty'),
  query('size')
    .optional(true)
    .isInt({ min: 1 })
    .withMessage('Value after \'size\' must be an integer more than or equal to 1')
    .notEmpty()
    .withMessage('Query param \'size\' cannot be empty'),
  query('authorId')
    .optional(true)
    .notEmpty()
    .withMessage('Query param \'authorId\' cannot be empty')
    .isUUID()
    .withMessage('Query param \'authorId\' must be a uuid'),
  query('genreId')
    .optional(true)
    .notEmpty()
    .withMessage('Query param \'genreId\' cannot be empty')
    .isUUID()
    .withMessage('Query param \'genreId\' must be a uuid'),
  query('startYear')
    .optional(true)
    .notEmpty()
    .withMessage('Query param \'startYear\' cannot be empty')
    .isInt({ min: 1000 })
    .withMessage('Value after \'startYear\' must be an integer more than or equal to 1000'),
  query('endYear')
    .optional(true)
    .notEmpty()
    .withMessage('Query param \'endYear\' cannot be empty')
    .isInt({ min: 1000 })
    .withMessage('Value after \'endYear\' must be an integer more than or equal to 1000'),
  query('tags')
    .optional(true)
    .notEmpty()
    .withMessage('\'tags\' cannot be empty'),
  query('tags.*')
    .optional(true)
    .isString()
    .withMessage('Value inside \'tags\' must be a string)'),
  query('name')
    .optional(true)
    .notEmpty()
    .withMessage('\'name\' cannot be empty')
    .not()
    .isInt()
    .withMessage('Value inside \'name\' must be a string'),
  query('title')
    .optional(true)
    .notEmpty()
    .withMessage('\'title\' cannot be empty')
    .not()
    .isInt()
    .withMessage('Value inside \'title\' must be a string'),
  query('isActive')
    .optional(true)
    .isBoolean()
    .withMessage('Query param \'isActive\' can be either true or false'),
  query('mId')
    .optional(true)
    .notEmpty()
    .withMessage('Query param \'mId\' cannot be empty')
    .isUUID()
    .withMessage('Query param \'mId\' must be a uuid')
];
