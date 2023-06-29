const express = require('express');
const { BookGenre } = require('../database/models');
const { generalControllers } = require('../controllers/general-controller');
const { deleteBookGenre } = require('../controllers/book-controller');
const { generalValidator } = require('../middleware/general-validator');
const { bookGenreValidations, bookGenreParamsValidations } = require('../utils/validations/models/book-genre');
const { authorizeUser } = require('../utils/auth');
const { roles } = require('../utils/constant-values');
const { checkBookGenreIDsValid } = require('../middleware/book-genre-middleware');
const generalController = generalControllers(BookGenre);

const router = express.Router();

router.post('/',
/*
    #swagger.tags = ['Book Genre']
    #swagger.summary = "Add genre to the book"
     #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/bookGenreBodyRequest'
          }
        }
      }
    }
    #swagger.responses[201] = {
    "description": "Successfully created",
        "schema": {
            "message": "Genre for book successfully created!"
        }
    }
    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'genreId' must be provided",
                    "param": "genreId",
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator(bookGenreValidations), checkBookGenreIDsValid(), generalController.create);

router.delete('/:genreId/:bookId',
/*
    #swagger.tags = ['Book Genre']
    #swagger.summary = "Delete genre from the book"
    #swagger.parameters['genreId'] = {
      "in": 'path',
      "description": 'ID genre parameter for delete specific book genre',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
    #swagger.parameters['bookId'] = {
      "in": 'path',
      "description": 'ID book parameter for delete specific book genre',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
       #swagger.responses[204] = {
        description: 'Successfully deleted book genre',
        "schema":{
            "message": "Book genre successfully deleted!"
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
        description: "Retrieving data from Book genre that does not exist",
        schema: {
            "message": "Not found",
            "details": "Combination is not found in a join table BookGenre"
        }
    }
    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin, roles.librarian]), generalValidator(bookGenreParamsValidations), deleteBookGenre());

module.exports = router;
