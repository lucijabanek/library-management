const { callbackErrorHandler } = require('./error-handlers');
const models = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/constant-messages');

module.exports.checkBookGenreIDsValid = () => {
  return callbackErrorHandler(async (req, _res, next) => {
    const { genreId, bookId } = req.body;

    const genre = await models.Genre.findByPk(genreId);

    if (!genre) {
      throw errors.NOT_FOUND(responseMessage.notFound(models.Genre.name));
    }

    const book = await models.Book.findByPk(bookId);

    if (!book) {
      throw errors.NOT_FOUND(responseMessage.notFound(models.Book.name));
    }

    return next();
  });
};
