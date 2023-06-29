const librarianController = require('../controllers/librarian-controller');
const { generalControllers } = require('../controllers/general-controller');
const { Librarian } = require('../database/models');
const express = require('express');
const generalController = generalControllers(Librarian);
const { roles } = require('../utils/constant-values');
const { createUser } = require('../controllers/user-controller');
const { authorizeUser } = require('../utils/auth');
const { generalValidator } = require('../middleware/general-validator');
const { librarianValidations } = require('../utils/validations/models/librarian');
const { userValidations } = require('../utils/validations/models/user');
const { generalValidations } = require('../utils/validations/general-validations');
const { queryValidations } = require('../utils/validations/query-validations');
const { paramValidations } = require('../utils/validations/param-validations');
const { userIdValidation } = require('../utils/validations/param-validations');
const { userUpdateValidations } = require('../utils/validations/models/user-update');

const router = express.Router();

router.get('/',
/*
    #swagger.tags = ['Librarian']
    #swagger.summary = "Retrieve all Librarians"

    #swagger.parameters["include"] = {
        "in": "query",
        "description": "Include associated table/s: [User]",
        "require": false,
        "schema": {
            "type": "array"
        }
    }

    #swagger.parameters["page"] = {
        "in": "query",
        "require": false,
        "schema": {
            "type": "integer"
        }
    }
    #swagger.parameters["size"] = {
        "in": "query",
        "require": false,
        "schema": {
            "type": "integer"
        }
    }

    #swagger.responses[200] = {
        description: 'Successfully retrieved Librarians',
        "schema": {
            "data": {
                "totalItems": 3,
                "modelRows": [{
                    $ref: '#/components/schemas/librarianResponse'
                }],
                "totalPages": 1,
                "currentPage": 0
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

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin, roles.librarian]), generalController.getAll);

router.get('/:id',
/*
    #swagger.tags = ['Librarian']
    #swagger.summary = "Retrieve Librarian by ID"

    #swagger.parameters["include"] = {
        "in": "query",
        "description": "Include associated table/s: [User]",
        "require": false,
        "schema": {
            "type": "array"
        }
    }

    #swagger.parameters = [
        {
            "name": "id",
            "in": "path",
            "description":"Librarian ID we want to retrieve",
            "required": true,
            "schema": {
                "type": "uuid"
            }
        }
    ]

    #swagger.responses[200] = {
        description: 'Successfully retrieved Librarian data',
        "schema":{
            $ref: '#/components/schemas/librarianResponse'
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
        description: "Retrieving data from Member that does not exist",
        schema: {
            "message": "Not found",
            "details": "Member not found!"
        }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin, roles.librarian]), generalValidator([...paramValidations, ...queryValidations]), generalController.getById);

router.post('/',
/*
    #swagger.tags = ['Librarian']
    #swagger.summary = "Create new Librarian"

    #swagger.requestBody = {
        "required": true,
        "content": {
            "application/json": {
                "schema": {
                    $ref: '#/components/schemas/librarianBody'
                }
            }
        }
    }

    #swagger.responses[201] = {
    "description": "Successfully created Librarian",
        "schema": {
            "message": "Librarian successfully created!"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'First name' must be provided",
                    "param": "firstName",
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
  authorizeUser([roles.admin]), generalValidator([...generalValidations, ...userValidations, ...librarianValidations]), createUser(roles.librarian));

router.put('/:userId',
/*
    #swagger.tags = ['Librarian']
    #swagger.summary = "Update existing Librarian"

    #swagger.parameters = [
        {
            "name": "userId",
            "in": "path",
            "description":"userId from Librarian we want to update",
            "required": true,
            "schema": {
                "type": "uuid"
            }
        }
    ]

    #swagger.requestBody = {
        "required": true,
        "content": {
            "application/json": {
                "schema": {
                    $ref: '#/components/schemas/librarianUpdateBody'
                }
            }
        }
    }

    #swagger.responses[200] = {
    "description": "Successfully updated Librarian",
        "schema": {
            "message": "Librarian successfully updated!"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'First name' must be provided",
                    "param": "firstName",
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

  authorizeUser([roles.admin]), generalValidator([...userIdValidation, ...userUpdateValidations, ...librarianValidations]), librarianController.updateLibrarian());

router.delete('/:id',
/*
    #swagger.tags = ['Librarian']
    #swagger.summary = "Delete Librarian"

    #swagger.parameters = [
        {
            "name": "id",
            "in": "path",
            "description":"Librarian ID we want to delete",
            "required": true,
            "schema": {
                "type": "uuid"
            }
        }
    ]

    #swagger.responses[204] = {
        description: 'Successfully deleted Librarian',
        "schema":{
            "message": "Librarian successfully deleted!"
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
        description: "Retrieving data from Member that does not exist",
        schema: {
            "message": "Not found",
            "details": "Member not found!"
        }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin]), generalValidator(paramValidations), generalController.delete);

module.exports = router;
