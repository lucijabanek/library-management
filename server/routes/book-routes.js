const express = require('express');
const { Book } = require('../database/models');
const { generalControllers } = require('../controllers/general-controller');
const { createBookWithISBN, createBook, filterByTitle, getFilteredBooks } = require('../controllers/book-controller');
const { generalValidator } = require('../middleware/general-validator');
const { paramValidations } = require('../utils/validations/param-validations');
const { queryValidations } = require('../utils/validations/query-validations');
const { bookValidations, bookWithISBNValidations } = require('../utils/validations/models/book');
const { authorizeUser } = require('../utils/auth');
const { roles } = require('../utils/constant-values');
const generalController = generalControllers(Book);

const router = express.Router();

router.get('/',
/*
    #swagger.tags = ['Book']
    #swagger.summary = "Retrieve all books"
     #swagger.parameters['include'] = {
      "in": 'query',
      "description": 'Include associated table. (Genres and/or Author)',
      "require": false,
      "schema": {
        "type": "array"
      }
    }
    #swagger.parameters['page'] = {
      "in": 'query',
      "description": 'Parameter for scrolling through the pages, must be a positive integer',
      "require": false,
      "schema": {
        "type": "integer"
      }
    }
      #swagger.parameters['size'] = {
      "in": 'query',
      "description": 'Parameter to limit data on one page, must be a positive integer equal or greater than 1',
      "require": false,
      "schema": {
        "type": "integer"
      }
    }
   #swagger.responses[200]={
      "description": "Books were successfully displayed (including Books and Author)",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/bookBodyResponse'
          }
        }
      }
    }
   #swagger.responses[400]={
      "description": "Error: Bad Request",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/validationError'
          }
        }
      }
    }
   #swagger.responses[404]={
      "description": "Error: Association Not Found",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/associationNotFound'
          }
        }
      }
    }
   #swagger.responses[500]={
      "description": "Error: Internal Server Error",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/serverError'
          }
        }
      }
    }
*/
  generalValidator(queryValidations), generalController.getAll);
router.get('/filter-by-title',
/*
    #swagger.tags = ['Book']
    #swagger.summary = "Filter books by title"
    #swagger.parameters['title'] = {
      "in": 'query',
      "description": 'Title parameter to filter book by title',
      "require": false,
      "schema": {
        "type": "string"
      }
    }
        #swagger.parameters['page'] = {
      "in": 'query',
      "description": 'Parameter for scrolling through the pages, must be a positive integer',
      "require": false,
      "schema": {
        "type": "integer"
      }
    }
    #swagger.parameters['size'] = {
      "in": 'query',
      "description": 'Parameter to limit data on one page, must be a positive integer equal or greater than 1',
      "require": false,
      "schema": {
        "type": "integer"
      }
    }
   #swagger.responses[200]={
      "description": "Filtered books were successfully displayed",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/filteredBookByTitleBodyResponse'
          }
        }
      }
    }
   #swagger.responses[400]={
      "description": "Error: Bad Request",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/validationError'
          }
        }
      }
    }
   #swagger.responses[500]={
      "description": "Error: Internal Server Error",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/serverError'
          }
        }
      }
    }
*/
  generalValidator(queryValidations), filterByTitle());
router.get('/filter-books',
/*
    #swagger.tags = ['Book']
    #swagger.summary = "Filter all books"
    #swagger.parameters['authorId'] = {
      "in": 'query',
      "description": 'Author ID parameter to filter book by author (can be one or more author IDs (uuid))',
      "require": false,
      "schema": {
        "type": "array"
      }
    }
    #swagger.parameters['genreId'] = {
      "in": 'query',
      "description": 'Genre ID parameter to filter book by genre (can be one or more genre IDs (uuid))',
      "require": false,
      "schema": {
        "type": "array"
      }
    }
    #swagger.parameters['bookTitleId'] = {
      "in": 'query',
      "description": 'Book Title ID parameter to filter book by title (can be one or more genre IDs (uuid))',
      "require": false,
      "schema": {
        "type": "array"
      }
    }
    #swagger.parameters['startYear'] = {
      "in": 'query',
      "description": 'startYear parameter to filter book by date',
      "require": false,
      "schema": {
        "type": "integer"
      }
    }
    #swagger.parameters['endYear'] = {
      "in": 'query',
      "description": 'endYear parameter to filter book by date',
      "require": false,
      "schema": {
        "type": "integer"
      }
    }
    #swagger.parameters['tags'] = {
      "in": 'query',
      "description": 'Tags parameter to filter book by date',
      "require": false,
      "schema": {
        "type": "array"
      }
    }
    #swagger.parameters['page'] = {
      "in": 'query',
      "description": 'Parameter for scrolling through the pages, must be a positive integer',
      "require": false,
      "schema": {
        "type": "integer"
      }
    }
    #swagger.parameters['size'] = {
      "in": 'query',
      "description": 'Parameter to limit data on one page, must be a positive integer equal or greater than 1',
      "require": false,
      "schema": {
        "type": "integer"
      }
    }
   #swagger.responses[200]={
      "description": "Filtered books were successfully displayed",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/bookBodyResponse'
          }
        }
      }
    }
   #swagger.responses[400]={
      "description": "Error: Bad Request",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/validationError'
          }
        }
      }
    }
   #swagger.responses[500]={
      "description": "Error: Internal Server Error",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/serverError'
          }
        }
      }
    }
*/
  generalValidator(queryValidations), getFilteredBooks());
router.post('/load-with-isbn',
/*
    #swagger.tags = ['Book']
    #swagger.summary = "Create new book using ISBN code and Google Books API"
    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/bookISBNBodyRequest'
          }
        }
      }
    }
    #swagger.responses[201] = {
    "description": "Successfully created Book",
        "schema": {
            "message": "Book successfully created!"
        }
    }
    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'ISBN' must be provided",
                    "param": "isbn",
                    "location": "body"
                },
            ]
        }
    }
    #swagger.responses[401] = {
        "description": "Unauthorized",
        schema: {
            $ref: '#/components/schemas/unauthorizedError'
        }
    }
    #swagger.responses[403] = {
        "description": "Permission error",
        schema: {
            $ref: '#/components/schemas/permissionError'
        }
    }
    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin, roles.librarian]), generalValidator(bookWithISBNValidations), createBookWithISBN());
router.post('/',
/*
    #swagger.tags = ['Book']
    #swagger.summary = "Create new book"
    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/bookBodyRequest'
          }
        }
      }
    }
    #swagger.responses[201] = {
    "description": "Successfully created Book",
        "schema": {
            "message": "Book successfully created!"
        }
    }
    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'Title' must be provided",
                    "param": "title",
                    "location": "body"
                },
            ]
        }
    }
    #swagger.responses[401] = {
        "description": "Unauthorized",
        schema: {
            $ref: '#/components/schemas/unauthorizedError'
        }
    }
    #swagger.responses[403] = {
        "description": "Permission error",
        schema: {
            $ref: '#/components/schemas/permissionError'
        }
    }
    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin, roles.librarian]), generalValidator(bookValidations), createBook());

router.get('/:id',
/*
    #swagger.tags = ['Book']
    #swagger.summary = "Retrieve specific book"
     #swagger.parameters['id'] = {
      "in": 'path',
      "description": 'Parameter for get data for specific book',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
    #swagger.parameters['include'] = {
      "in": 'query',
      "description": 'Include associated table. (Genres and/or Author)',
      "require": false,
      "schema": {
        "type": "array"
      }
    }
   #swagger.responses[200]={
      "description": "Book was successfully displayed",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/specificBookBodyResponse'
          }
        }
      }
    }
   #swagger.responses[400]={
      "description": "Error: Bad Request",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/validationError'
          }
        }
      }
    }
    #swagger.responses[404] = {
        description: "Retrieving data from Book that does not exist",
        schema: {
            "message": "Not found",
            "details": "Book not found!"
        }
    }
   #swagger.responses[500]={
      "description": "Error: Internal Server Error",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/serverError'
          }
        }
      }
    }
*/
  generalValidator([...paramValidations, ...queryValidations]), generalController.getById);
router.put('/:id',
/*
    #swagger.tags = ['Book']
    #swagger.summary = "Update specific book"
    #swagger.parameters['id'] = {
      "in": 'path',
      "description": 'Parameter for update data for specific book',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/updatedBookBodyRequest'
          }
        }
      }
    }
   #swagger.responses[200]={
      "description": "Author was successfully updated",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/updatedBookBodyResponse'
          }
        }
      }
    }
   #swagger.responses[400]={
      "description": "Error: Bad Request",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/validationError'
          }
        }
      }
    }
    #swagger.responses[401] = {
        "description": "Unauthorized",
        schema: {
            $ref: '#/components/schemas/unauthorizedError'
        }
    }
    #swagger.responses[403] = {
        "description": "Permission error",
        schema: {
            $ref: '#/components/schemas/permissionError'
        }
    }
    #swagger.responses[404] = {
        description: "Retrieving data from Book that does not exist",
        schema: {
            "message": "Not found",
            "details": "Book not found!"
        }
    }
   #swagger.responses[500]={
      "description": "Error: Internal Server Error",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/serverError'
          }
        }
      }
    }
*/
  authorizeUser([roles.admin, roles.librarian]), generalValidator([...paramValidations, ...bookValidations]), generalController.update);
router.delete('/:id',
/*
    #swagger.tags = ['Book']
    #swagger.summary = "Delete specific book"
    #swagger.parameters['id'] = {
      "in": 'path',
      "description": 'Parameter for delete specific book',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
    #swagger.responses[204] = {
        description: 'Successfully deleted Book',
        "schema":{
            "message": "Book successfully deleted!"
        }
    }
    #swagger.responses[401] = {
        "description": "Unauthorized",
        schema: {
            $ref: '#/components/schemas/unauthorizedError'
        }
    }
    #swagger.responses[403] = {
        "description": "Permission error",
        schema: {
            $ref: '#/components/schemas/permissionError'
        }
    }
    #swagger.responses[404] = {
        description: "Retrieving data from Book that does not exist",
        schema: {
            "message": "Not found",
            "details": "Book not found!"
        }
    }
    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin, roles.librarian]), generalValidator(paramValidations), generalController.delete);

module.exports = router;
