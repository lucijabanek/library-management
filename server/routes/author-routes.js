const express = require('express');
const { Author } = require('../database/models');
const { generalControllers } = require('../controllers/general-controller');
const { generalValidator } = require('../middleware/general-validator');
const { paramValidations } = require('../utils/validations/param-validations');
const { queryValidations } = require('../utils/validations/query-validations');
const { authorValidations } = require('../utils/validations/models/author');
const { authorizeUser } = require('../utils/auth');
const { roles } = require('../utils/constant-values');
const generalController = generalControllers(Author);

const router = express.Router();

router.get('/',
/*
    #swagger.tags = ['Author']
    #swagger.summary = "Retrieve all authors"
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
      "description": "Authors were successfully displayed (including Books)",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/authorBodyResponse'
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
    #swagger.tags = ['Author']
    #swagger.summary = "Create new author"
    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/authorBodyRequest'
          }
        }
      }
    }
    #swagger.responses[201] = {
    "description": "Successfully created Author",
        "schema": {
            "message": "Author successfully created!"
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator(authorValidations), generalController.create);

router.get('/filter-by-name',
/*
    #swagger.tags = ['Author']
    #swagger.summary = "Filter authors by name"
    #swagger.parameters['name'] = {
      "in": 'query',
      "description": 'Names of authors to filter',
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
      "description": "Filtered authors were successfully displayed",
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
    #swagger.tags = ['Author']
    #swagger.summary = "Retrieve specific author"
    #swagger.parameters['id'] = {
      "in": 'path',
      "description": 'Parameter for get data for specific author',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
   #swagger.responses[200]={
      "description": "Author was successfully displayed",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/specificAuthorBodyResponse'
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
        description: "Retrieving data from Author that does not exist",
        schema: {
            "message": "Not found",
            "details": "Author not found!"
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
    #swagger.tags = ['Author']
    #swagger.summary = "Update specific author"
    #swagger.parameters['id'] = {
      "in": 'path',
      "description": 'Parameter for update data for specific author',
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
            $ref: '#/components/schemas/updatedAuthorBodyRequest'
          }
        }
      }
    }
   #swagger.responses[200]={
      "description": "Author was successfully updated",
      "content": {
        "application/json": {
          "schema": {
            $ref: '#/components/schemas/updatedAuthorBodyResponse'
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
        description: "Retrieving data from Author that does not exist",
        schema: {
            "message": "Not found",
            "details": "Author not found!"
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
  generalValidator([...paramValidations, ...authorValidations]), generalController.update);
router.delete('/:id',
/*
    #swagger.tags = ['Author']
    #swagger.summary = "Delete specific author"
    #swagger.parameters['id'] = {
      "in": 'path',
      "description": 'Parameter for delete specific author',
      "require": true,
      "schema": {
        "type": "uuid"
      }
    }
       #swagger.responses[204] = {
        description: 'Successfully deleted Author',
        "schema":{
            "message": "Author successfully deleted!"
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
        description: "Retrieving data from Author that does not exist",
        schema: {
            "message": "Not found",
            "details": "Author not found!"
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
