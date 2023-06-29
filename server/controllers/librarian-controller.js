/* eslint-disable no-unused-vars */
const models = require('../database/models');
const { callbackErrorHandler } = require('../middleware/error-handlers');
const responseMessage = require('../utils/constant-messages');
const userController = require('./user-controller');

exports.updateLibrarian = () => {
  return callbackErrorHandler(async function (req, res) {
    const { userId } = req.params;
    const { firstName, lastName, address, dateOfBirth } = req.body;
    const userData = { firstName, lastName };
    const librarianData = { address, dateOfBirth };
    await userController.updateUser(models.Librarian, userId, userData, librarianData);
    return res.status(200).json({ message: responseMessage.updateSuccess(models.Librarian.name) });
  });
};
