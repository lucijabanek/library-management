const { callbackErrorHandler } = require('../middleware/error-handlers');
const { getPagination, getPagingData } = require('../utils/pagination');
const responseMessage = require('../utils/constant-messages');
const models = require('../database/models');
const { errors } = require('../utils/errors');
const fetch = require('node-fetch');
const ISBN = require('isbn-validate');
const { Op } = require('sequelize');
const { checkModelAssociations } = require('./helpers/model-associations');

module.exports.createBookWithISBN = () => {
  return callbackErrorHandler(async function (req, res) {
    const { isbn } = req.body;

    if (!ISBN.Validate(isbn)) {
      throw errors.VALIDATION(responseMessage.invalidISBNType);
    }

    const fetchData = await fetch(
       `${process.env.GOOGLE_BOOKS_API_URL}?q=isbn:${isbn}`
    );
    const bookData = await fetchData.json();

    if (bookData.totalItems === 0) {
      throw errors.NOT_FOUND(responseMessage.notFound('ISBN'));
    }

    const fetchedBook = bookData.items[0].volumeInfo;
    const genreName = fetchedBook.categories[0];
    const title = fetchedBook.title;
    const authorName = fetchedBook.authors[0];
    const publishedDate = new Date(fetchedBook.publishedDate);

    const transaction = await models.sequelize.transaction();

    try {
      let genre = await models.Genre.findOne({ where: { name: genreName } });
      if (!genre) {
        genre = await models.Genre.create({ name: genreName }, { transaction });
      }
      const genreId = genre.id;

      let author = await models.Author.findOne({ where: { name: authorName } });
      if (!author) {
        author = await models.Author.create({ name: authorName }, { transaction });
      }

      const authorId = author.id;

      const newBook = await models.Book.create({ isbn: req.body.isbn, title, dateOfRelease: publishedDate, authorId }, { transaction });
      await models.BookGenre.create({ genreId, bookId: newBook.id }, { transaction });

      await transaction.commit();

      return res.status(201).json({ message: responseMessage.createSuccess(models.Book.name) });
    } catch (error) {
      await transaction.rollback();
      if (error.original.constraint === 'book_isbn_key') {
        throw errors.CONFLICT(responseMessage.uniqueISBNError);
      }
      throw error;
    }
  });
};

module.exports.createBook = () => {
  return callbackErrorHandler(async function (req, res) {
    const transaction = await models.sequelize.transaction();

    const { title, isbn, dateOfRelease, tags, authorId, genreId } = req.body;
    const bookData = { title, isbn, dateOfRelease, tags, authorId };

    if (isbn && !ISBN.Validate(isbn)) {
      throw errors.VALIDATION(responseMessage.invalidISBNType);
    }

    if (genreId) {
      const genre = await models.Genre.findOne({ where: { id: genreId } });
      if (!genre) {
        throw errors.NOT_FOUND(responseMessage.notFound(models.Genre.name));
      }
    }

    const author = await models.Author.findOne({ where: { id: bookData.authorId } });
    if (!author) {
      throw errors.NOT_FOUND(responseMessage.notFound(models.Author.name));
    }

    try {
      const newBook = await models.Book.create(bookData, { transaction });
      await models.BookGenre.create({ genreId, bookId: newBook.id }, { transaction });

      await transaction.commit();

      return res.status(201).json({ message: responseMessage.createSuccess(models.Book.name) });
    } catch (error) {
      await transaction.rollback();
      if (error.original.constraint === 'book_isbn_key') {
        throw errors.CONFLICT(responseMessage.uniqueISBNError);
      }
      throw error;
    }
  });
};

module.exports.deleteBookGenre = () => {
  return callbackErrorHandler(async function (req, res) {
    const genreId = req.params.genreId;
    const bookId = req.params.bookId;

    const deletedRow = await models.BookGenre.destroy({
      where: {
        genreId,
        bookId
      }
    });

    if (!deletedRow) {
      throw errors.NOT_FOUND(responseMessage.notFoundJoinTable(models.BookGenre.name));
    }

    return res.status(204).json({
      message: responseMessage.deleteSuccess(models.BookGenre.name)
    });
  });
};

module.exports.filterByTitle = () => {
  return callbackErrorHandler(async function (req, res) {
    const model = (models.Book.name).toLowerCase();
    let queryString = `SELECT * FROM ${model}`;
    const title = req.query.title;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const titleQueryParams = [];
    const options = {
      order: [['title', 'ASC']],
      limit,
      offset
    };

    if (!title) {
      let allInstances = await models.Book.findAndCountAll(options);

      allInstances = getPagingData(allInstances, page, limit);

      return res.status(200).json({
        data: allInstances
      });
    }

    if (title.length < 3) {
      return res.status(200).json({
        data: []
      });
    }

    queryString += ' WHERE title ILIKE ?';
    titleQueryParams.push(`%${title}%`);

    const filteredData = await models.Book.sequelize.query(queryString, {
      model: models.Book,
      mapToModel: true,
      replacements: titleQueryParams
    });

    return res.status(200).json({
      data: filteredData
    });
  });
};

module.exports.getFilteredBooks = () => {
  return callbackErrorHandler(async (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const authorIds = req.query.authorId ? req.query.authorId : null;
    const genreIds = req.query.genreId ? req.query.genreId : null;
    const bookTitleIds = req.query.bookTitleId ? req.query.bookTitleId : null;
    const startYear = req.query.startYear ? parseInt(req.query.startYear) : null;
    const endYear = req.query.endYear ? parseInt(req.query.endYear) : null;
    const tags = req.query.tags || [];

    const filter = {
      limit,
      offset,
      order: [['title', 'ASC']],
      include: [],
      where: { [Op.and]: [] }
    };

    if (authorIds) {
      if (Array.isArray(authorIds)) {
        filter.where[Op.and].push({ authorId: { [Op.in]: authorIds } });
      } else {
        filter.where[Op.and].push({ authorId: { [Op.eq]: authorIds } });
      }
    }

    if (bookTitleIds) {
      if (Array.isArray(bookTitleIds)) {
        filter.where[Op.and].push({ id: { [Op.in]: bookTitleIds } });
      } else {
        filter.where[Op.and].push({ id: { [Op.eq]: bookTitleIds } });
      }
    }

    if (startYear) {
      filter.where[Op.and].push({ dateOfRelease: { [Op.gte]: new Date(startYear, 0, 1) } });
    }
    if (endYear) {
      filter.where[Op.and].push({ dateOfRelease: { [Op.lte]: new Date(endYear, 11, 31) } });
    }

    if (tags.length > 0) {
      filter.where[Op.and].push({ tags: { [Op.contains]: tags } });
    }

    if (genreIds) {
      const includeConfig = checkModelAssociations(models.Book, ['Genres']);
      if (Array.isArray(genreIds)) {
        filter.include.push({ through: includeConfig[0].through.model, model: includeConfig[0].model, where: { id: { [Op.in]: genreIds } } });
      } else {
        filter.include.push({ through: includeConfig[0].through.model, model: includeConfig[0].model, where: { id: { [Op.eq]: genreIds } } });
      }
      const includeSecondConfig = checkModelAssociations(models.Book, ['Author']);
      filter.include.push(includeSecondConfig[0].model);
    } else {
      const includeConfig = checkModelAssociations(models.Book, ['Author', 'Genres']);
      filter.include = includeConfig;
    }

    let filteredBooks = await models.Book.findAndCountAll(filter);
    filteredBooks = getPagingData(filteredBooks, page, limit);

    return res.status(200).json({ data: filteredBooks });
  });
};
