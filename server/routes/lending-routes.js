const { Router } = require('express');

const models = require('../database/models');
const { generalControllers } = require('../controllers/general-controller');
const { createLending, bookReturn, getMemberLendings, getAllLendings } = require('../controllers/lending-controller');
const { checkIsMembershipValid, checkIsBookLimitExceeded } = require('../middleware/lending-middlewares');
const { generalValidator } = require('../middleware/general-validator');
const { paramValidations } = require('../utils/validations/param-validations');
const { queryValidations } = require('../utils/validations/query-validations');
const { generalValidations } = require('../utils/validations/general-validations');
const { lendingValidations } = require('../utils/validations/models/lending');
const { authorizeUser } = require('../utils/auth');
const { roles } = require('../utils/constant-values');

const router = Router();

const lendingControllers = generalControllers(models.Lending);

router.post(
  /*
    #swagger.tags=["Lending"]
    #swagger.summary="Lend a book to a library member"

    #swagger.requestBody={
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/lendingBody"
          }
        }
      }
    }

    #swagger.responses[201] = {
    "description": "Lending successfully created",
        "schema": {
            "message": "Lending successfully created!"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'memberId' must be provided",
                    "param": "memberId",
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
  '/', authorizeUser([roles.admin, roles.librarian]), generalValidator([...generalValidations, ...lendingValidations]), checkIsMembershipValid(), checkIsBookLimitExceeded(), createLending());
router.get(
  /*
    #swagger.tags=["Lending"]
    #swagger.summary="Retrieve data about all lendings"

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
    #swagger.parameters["isActive"] = {
      "in": "query",
      "require": false,
      "schema": {
        "type": "boolean"
      }
    }

    #swagger.responses[200] = {
      description: 'Lending successfully retrieved',
      "schema": {
        "data": {
          "totalItems": 1,
          "modelRows": [{
              $ref: '#/components/schemas/lendingResponse'
          }],
          "totalPages": 1,
          "currentPage": 0
        }
      }
    }

    #swagger.responses[400] = {
      "description": "Invalid input data",
      "schema": {
        "message": "Invalid input",
        "details": [
          {
            "msg": "':id' must be a uuid",
            "param": "id",
            "location": "params"
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

    #swagger.responses[404] = {
      "description": "Not found",
      schema: {
        message: "Not found",
        details: "Association with alias 'aa' does not exist on 'Lending'"
      }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
  */
  '/', authorizeUser([roles.admin, roles.librarian]), generalValidator(queryValidations), getAllLendings());
router.get(
  /*
    #swagger.tags=["Lending"]
    #swagger.summary="Retrieve data about all lendings for a library specific member"

    #swagger.parameters["mId"] = {
      "in": "query",
      "required": false,
      "schema": {
        "type": "uuid"
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
    #swagger.parameters["isActive"] = {
      "in": "query",
      "require": false,
      "schema": {
        "type": "boolean"
      }
    }

    #swagger.responses[200] = {
      description: 'Lending successfully retrieved',
      "schema": {
        "data": {
          "totalItems": 1,
          "modelRows": [{
              $ref: '#/components/schemas/lendingSimplifiedResponse'
          }],
          "totalPages": 1,
          "currentPage": 0
        }
      }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "Value after 'page' must be a positive integer",
                    "param": "page",
                    "location": "param"
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

    #swagger.responses[404] = {
      "description": "Not found",
      schema: {
        message: "Not found",
        details: "Association with alias 'aa' does not exist on 'Lending'"
      }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
  */
  '/getMemberLendings', authorizeUser([roles.admin, roles.librarian, roles.member]), generalValidator(queryValidations), getMemberLendings());
router.get(
  /*
    #swagger.tags=["Lending"]
    #swagger.summary="Retrieve data about a specific lending"

    #swagger.parameters["include"] = {
      "in": "query",
      "description": "Include associated table/s: [Member, Book]",
      "require": false,
      "schema": {
        "type": "array"
      }
    }

    #swagger.responses[200] = {
      description: 'Lending successfully retrieved',
      "schema": {
        $ref: '#/components/schemas/lendingResponse'
      }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "Value after 'page' must be a positive integer",
                    "param": "page",
                    "location": "param"
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

    #swagger.responses[404] = {
      "description": "Not found",
      schema: {
        message: "Not found",
        details: "Association with alias 'aa' does not exist on 'Lending'"
      }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
  */
  '/:id', authorizeUser([roles.admin, roles.librarian]), generalValidator([...paramValidations, ...queryValidations]), lendingControllers.getById);
router.put(
  /*
    #swagger.tags=["Lending"]
    #swagger.summary="Make a book return"

    #swagger.responses[200] = {
      "description": "Book successfully returned",
      schema: {
        "message": "Book is successfully returned.",
        "lateFee": "0.00"
      }
    }

    #swagger.responses[400] = {
      "description": "Invalid input data",
      schema: {
        "message": "Invalid input",
        "details": "This book has already been returned."
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
      "description": "Not found",
      schema: {
        message: "Not found",
        details: "Lending not found!"
      }
    }

    #swagger.responses[500] = {
      "description": "Server error",
      "schema": {
          $ref: '#/components/schemas/serverError'
      }
    }
  */
  '/bookReturn/:id', authorizeUser([roles.admin, roles.librarian]), generalValidator(paramValidations), bookReturn());

module.exports = router;
