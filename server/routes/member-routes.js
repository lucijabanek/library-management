const memberController = require('../controllers/member-controller');
const { generalControllers } = require('../controllers/general-controller');
const { Member } = require('../database/models');
const express = require('express');
const generalController = generalControllers(Member);
const { roles } = require('../utils/constant-values');
const { createUser } = require('../controllers/user-controller');
const { authorizeUser } = require('../utils/auth');
const { generalValidator } = require('../middleware/general-validator');
const { memberValidations } = require('../utils/validations/models/member');
const { subscriptionDaysValidation } = require('../utils/validations/models/member');
const { userValidations } = require('../utils/validations/models/user');
const { generalValidations } = require('../utils/validations/general-validations');
const { queryValidations } = require('../utils/validations/query-validations');
const { paramValidations } = require('../utils/validations/param-validations');
const { userIdValidation } = require('../utils/validations/param-validations');
const { userUpdateValidations } = require('../utils/validations/models/user-update');

const router = express.Router();

router.get('/',
/*
    #swagger.tags = ['Member']
    #swagger.summary = "Retrieve all Members"

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
        description: 'Successfully retrieved Members',
        "schema": {
            "data": {
                "totalItems": 3,
                "modelRows": [{
                    $ref: '#/components/schemas/memberResponse'
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
    #swagger.tags = ['Member']
    #swagger.summary = "Retrieve Member by ID"

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
            "description":"Member ID we want to retrieve",
            "required": true,
            "schema": {
                "type": "uuid"
            }
        }
    ]

    #swagger.responses[200] = {
        description: 'Successfully retrieved Member data',
        "schema":{
            $ref: '#/components/schemas/memberResponse'
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
    #swagger.tags = ['Member']
    #swagger.summary = "Create new Member"

    #swagger.requestBody = {
        "required": true,
        "content": {
            "application/json": {
                "schema": {
                    $ref: '#/components/schemas/memberBody'
                }
            }
        }
    }

    #swagger.responses[201] = {
    "description": "Successfully created Member",
        "schema": {
            "message": "Member successfully created!"
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator([...generalValidations, ...userValidations, ...memberValidations]), createUser(roles.member));

router.put('/:userId',
/*
    #swagger.tags = ['Member']
    #swagger.summary = "Update existing Member"

    #swagger.parameters = [
        {
            "name": "userId",
            "in": "path",
            "description":"userId from Member we want to update",
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
                    $ref: '#/components/schemas/memberUpdateBody'
                }
            }
        }
    }

    #swagger.responses[200] = {
    "description": "Successfully updated Member",
        "schema": {
            "message": "Member successfully updated!"
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator([...userIdValidation, ...userUpdateValidations, ...memberValidations]), memberController.updateMember());

router.post('/subscription/:id',
/*
    #swagger.tags = ['Member']
    #swagger.summary = "Renew Member's subscription"

    #swagger.parameters = [
        {
            "name": "id",
            "in": "path",
            "description":"Member ID whose subscription we want to renew",
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
                    $ref: '#/components/schemas/subscriptionDateBody'
                }
            }
        }
    }

    #swagger.responses[201] = {
    "description": "Successfully created Member",
        "schema": {
            "message": "Successfully updated Member subscription!"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": "The new subscription expiration date cannot be less than the previous one",
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator([...paramValidations, ...subscriptionDaysValidation]), memberController.addNewSubscription());

router.put('/subscription/:id',
/*
    #swagger.tags = ['Member']
    #swagger.summary = "Update Member's last subscription"

    #swagger.parameters = [
        {
            "name": "id",
            "in": "path",
            "description":"Member ID whose last subscription we want to update",
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
                    $ref: '#/components/schemas/subscriptionDateBody'
                }
            }
        }
    }

    #swagger.responses[201] = {
    "description": "Successfully created Member",
        "schema": {
            "message": "Successfully updated Member subscription!"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": "The new subscription expiration date cannot be less than the previous one",
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator([...paramValidations, ...subscriptionDaysValidation]), memberController.updateLastSubscription());

router.delete('/subscription/:id',
/*
    #swagger.tags = ['Member']
    #swagger.summary = "Delete Member's last subscription"

    #swagger.parameters = [
        {
            "name": "id",
            "in": "path",
            "description":"Member ID we want to delete last subscription from",
            "required": true,
            "schema": {
                "type": "uuid"
            }
        }
    ]

    #swagger.responses[204] = {
        description: 'Successfully deleted Member data',
        "schema":{
            "message": "Member Subscription successfully deleted!"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": "Action is not possible, you cannot modify last subscription expiration date!"
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
        description: "Delete subscription from Member that does not exist",
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator([...paramValidations]), memberController.deleteLastSubscription());

router.delete('/:id',
/*
    #swagger.tags = ['Member']
    #swagger.summary = "Delete Member"

    #swagger.parameters = [
        {
            "name": "id",
            "in": "path",
            "description":"Member ID we want to delete",
            "required": true,
            "schema": {
                "type": "uuid"
            }
        }
    ]

    #swagger.responses[204] = {
        description: 'Successfully deleted Member',
        "schema":{
            "message": "Member successfully deleted!"
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator(paramValidations), generalController.delete);

module.exports = router;
