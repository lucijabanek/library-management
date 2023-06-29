const adminController = require('../controllers/admin-controller');
const { generalControllers } = require('../controllers/general-controller');
const { Admin } = require('../database/models');
const express = require('express');
const generalController = generalControllers(Admin);
const { roles } = require('../utils/constant-values');
const { createUser } = require('../controllers/user-controller');
const { authorizeUser } = require('../utils/auth');
const { generalValidator } = require('../middleware/general-validator');
const { userValidations } = require('../utils/validations/models/user');
const { userUpdateValidations } = require('../utils/validations/models/user-update');
const { generalValidations } = require('../utils/validations/general-validations');
const { queryValidations } = require('../utils/validations/query-validations');
const { paramValidations } = require('../utils/validations/param-validations');
const { userIdValidation } = require('../utils/validations/param-validations');

const router = express.Router();

router.get('/',
/*
    #swagger.tags = ['Admin']
    #swagger.summary = "Retrieve all Admins"

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
        description: 'Successfully retrieved Admins',
        "schema": {
            "data": {
                "totalItems": 3,
                "modelRows": [{
                    $ref: '#/components/schemas/adminResponse'
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
  authorizeUser([roles.admin]), generalController.getAll);

router.get('/:id',
/*
    #swagger.tags = ['Admin']
    #swagger.summary = "Retrieve Admin by ID"

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
            "description":"Admin ID we want to retrieve",
            "required": true,
            "schema": {
                "type": "uuid"
            }
        }
    ]

    #swagger.responses[200] = {
        description: 'Successfully retrieved Admin data',
        "schema":{
            $ref: '#/components/schemas/adminResponse'
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
        description: "Retrieving data from Admin that does not exist",
        schema: {
            "message": "Not found",
            "details": "Admin not found!"
        }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin]), generalValidator([...paramValidations, ...queryValidations]), generalController.getById);

router.post('/',
/*
    #swagger.tags = ['Admin']
    #swagger.summary = "Create new Admin"

    #swagger.requestBody = {
        "required": true,
        "content": {
            "application/json": {
                "schema": {
                    $ref: '#/components/schemas/adminBody'
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
  authorizeUser([roles.admin]), generalValidator([...generalValidations, ...userValidations]), createUser(roles.admin));

router.put('/:userId',
/*
    #swagger.tags = ['Admin']
    #swagger.summary = "Update existing Admin"

    #swagger.parameters = [
        {
            "name": "userId",
            "in": "path",
            "description":"userId from Admin we want to update",
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
                    $ref: '#/components/schemas/adminUpdateBody'
                }
            }
        }
    }

    #swagger.responses[200] = {
    "description": "Successfully updated Admin",
        "schema": {
            "message": "Admin successfully updated!"
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
  authorizeUser([roles.admin]), generalValidator([...userIdValidation, ...userUpdateValidations]), adminController.updateAdmin());

router.delete('/:id',
/*
    #swagger.tags = ['Admin']
    #swagger.summary = "Delete Admin"

    #swagger.parameters = [
        {
            "name": "id",
            "in": "path",
            "description":"Admin ID we want to delete",
            "required": true,
            "schema": {
                "type": "uuid"
            }
        }
    ]

    #swagger.responses[204] = {
        description: 'Successfully deleted Admin',
        "schema":{
            "message": "Admin successfully deleted!"
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
        description: "Retrieving data from Admin that does not exist",
        schema: {
            "message": "Not found",
            "details": "Admin not found!"
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
