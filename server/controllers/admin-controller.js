const models = require('../database/models');
const { callbackErrorHandler } = require('../middleware/error-handlers');
const responseMessage = require('../utils/constant-messages');
const userController = require('./user-controller');

exports.updateAdmin = () => {
  return callbackErrorHandler(async function (req, res) {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    const userData = { firstName, lastName };
    const adminData = {};
    await userController.updateUser(models.Admin, userId, userData, adminData);
    return res.status(200).json({ message: responseMessage.updateSuccess(models.Admin.name) });
  });
};
