const authenticationController = require('../controllers/authentication-controller');
const userController = require('../controllers/user-controller');
const express = require('express');
const { authorizeUser } = require('../utils/auth');
const { roles } = require('../utils/constant-values');
const { generalValidator } = require('../middleware/general-validator');
const { updatePassword } = require('../utils/validations/models/update-password');
const { loginValidation } = require('../utils/validations/models/login');
const { emailValidation, passwordResetValidation } = require('../utils/validations/models/password-reset');

const router = express.Router();

router.post('/login',
/*
    #swagger.tags = ['User']
    #swagger.summary = "Login"

    #swagger.requestBody = {
        "required": true,
        "content": {
            "application/json": {
                "schema": {
                    $ref: '#/components/schemas/loginBody'
                }
            }
        }
    }

    #swagger.responses[200] = {
    "description": "Successfully logged in",
        "schema": {
            "message": "Successfully logged in!",
            "token": "jwtToken"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'Email' must be provided",
                    "param": "email",
                    "location": "body"
                },
            ]
        }
    }

    #swagger.responses[404] = {
        description: "Login with email that does not exist",
        schema: {
            "message": "Not found",
            "details": "User not found!"
        }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  generalValidator(loginValidation),
  authenticationController.login());

router.get('/profile',
/*
    #swagger.tags = ['User']
    #swagger.summary = "User profile"

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
        description: 'Successfully retrieved User profile data',
        "schema":{
            $ref: '#/components/schemas/profileData'
        }
    }

    #swagger.responses[401] = {
        "description": "Unauthorized",
        schema: {
            $ref: '#/components/schemas/unauthorizedError'
        }
    }

    #swagger.responses[404] = {
        description: "Retrieving data from User that does not exist",
        schema: {
            "message": "Not found",
            "details": "User not found!"
        }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  authorizeUser([roles.admin, roles.librarian, roles.member]), userController.retrieveLoggedUser());

router.put('/profile/password',
/*
    #swagger.tags = ['User']
    #swagger.summary = "Update password"

    #swagger.requestBody = {
        "required": true,
        "content": {
            "application/json": {
                "schema": {
                    $ref: '#/components/schemas/passwordUpdate'
                }
            }
        }
    }

    #swagger.responses[200] = {
    "description": "Successfully updated password",
        "schema": {
            "message": "Password updated successfully!"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'New password' must be atleast 6 characters long",
                    "param": "newPassword",
                    "location": "body"
                }
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
  authorizeUser([roles.admin, roles.librarian]), generalValidator(updatePassword), userController.changePassword());

router.post('/password-reset',
/*
 #swagger.tags = ['User']
    #swagger.summary = "Password Reset"

    #swagger.requestBody = {
        "required": true,
        "content": {
            "application/json": {
                "schema": {
                    example: {
                        email: 'useremail@gmail.com'
                    }
                }
            }
        }
    }

    #swagger.responses[201] = {
    "description": "User found and email sent",
        "schema": {
            "message": "Request sent, an email with password reset link has been sent to your address!",
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'Email' must be provided",
                    "param": "email",
                    "location": "body"
                },
            ]
        }
    }

    #swagger.responses[404] = {
        description: "Sending email to user that does not exist",
        schema: {
            "message": "Not found",
            "details": "User not found!"
        }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  generalValidator(emailValidation), userController.createAndSendPasswordResetToken());

router.post('/password-create',
/*
 #swagger.tags = ['User']
    #swagger.summary = "Password Create"

     #swagger.requestBody = {
        "required": true,
        "content": {
            "application/json": {
                "schema": {
                    $ref: '#/components/schemas/passwordCreate'
                }
            }
        }
    }

    #swagger.responses[200] = {
    "description": "User password updated",
        "schema": {
            "message": "Password updated successfully!"
        }
    }

    #swagger.responses[400] = {
        "description": "Invalid input data",
        "schema": {
            "message": "Invalid input",
            "details": [
                {
                    "msg": "'New password' must be atleast 6 characters long",
                    "param": "newPassword",
                    "location": "body"
                }
            ]
        }
    }

    #swagger.responses[500] = {
        "description": "Server error",
        "schema": {
            $ref: '#/components/schemas/serverError'
        }
    }
*/
  generalValidator(passwordResetValidation), userController.resetPassword());

module.exports = router;
