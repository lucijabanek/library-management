const express = require('express');
const { Genre } = require('../database/models');
const { generalControllers } = require('../controllers/general-controller');
const { generalValidator } = require('../middleware/general-validator');
const { paramValidations } = require('../utils/validations/param-validations');
const { queryValidations } = require('../utils/validations/query-validations');
const { genreValidations } = require('../utils/validations/models/genre');
const { authorizeUser } = require('../utils/auth');
const { roles } = require('../utils/constant-values');
const generalController = generalControllers(Genre);

const router = express.Router();

router.get('/',
/*
    #swagger.tags = ['Genre']
    #swagger.summary = "Retrieve all genres"
      #swagger.parameters['include'] = {
      "in": 'query',
      "description": 'Include associated table. (Books)',
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
      "description": "Genres were successfully displayed (including Books)",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/genreBodyResponse'
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
router.post('/',
/*
    #swagger.tags = ['Genre']
    #swagger.summary = "Create new genre"
    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/genreBodyRequest'
          }
        }
      }
    }
    #swagger.responses[201] = {
    "description": "Successfully created Genre",
        "schema": {
            "message": "Genre successfully created!"
        }
    }
    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'Name' must be provided",
                    "param": "name",
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator(genreValidations), generalController.create);

router.get('/filter-by-name',
/*
    #swagger.tags = ['Genre']
    #swagger.summary = "Filter genres by name"
    #swagger.parameters['name'] = {
      "in": 'query',
      "description": 'Names of genres to filter',
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
      "description": "Filtered genres were successfully displayed",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/genreFilterBodyResponse'
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
  generalValidator(queryValidations), generalController.filterByName);

router.get('/:id',
/*
#swagger.tags = ['Genre']
#swagger.summary = "Retrieve specific genre"
    #swagger.parameters['include'] = {
      "in": 'query',
      "description": 'Include associated table. (Books)',
      "require": false,
      "schema": {
        "type": "array"
      }
    }
    #swagger.parameters['id'] = {
      "in": 'path',
      "description": 'Parameter for get data for specific genre',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
   #swagger.responses[200]={
      "description": "Genres were successfully displayed (including Books)",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/specificGenreBodyResponse'
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
        description: "Retrieving data from Genre that does not exist",
        schema: {
            "message": "Not found",
            "details": "Genre not found!"
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
  generalValidator(paramValidations), generalController.getById);
router.delete('/:id',
/*
    #swagger.tags = ['Genre']
    #swagger.summary = "Delete specific genre"
    #swagger.parameters['id'] = {
      "in": 'path',
      "description": 'Parameter for delete specific genre',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
       #swagger.responses[204] = {
        description: 'Successfully deleted Genre',
        "schema":{
            "message": "Genre successfully deleted!"
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
        description: "Retrieving data from Genre that does not exist",
        schema: {
            "message": "Not found",
            "details": "Genre not found!"
        }
    }
    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin, roles.librarian]), generalValidator(paramValidations), generalController.hardDelete);

module.exports = router;
