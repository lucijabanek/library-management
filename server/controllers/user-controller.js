const models = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/constant-messages');
const { callbackErrorHandler } = require('../middleware/error-handlers');
const { roles, modelNames } = require('../utils/constant-values');
const bcrypt = require('bcryptjs');
const userService = require('../services/user-service');
const resetPasswordService = require('../services/reset-password');
const crypto = require('crypto');

exports.createUser = (role) => {
  return callbackErrorHandler(async function (req, res) {
    const transaction = await models.sequelize.transaction();
    try {
      // create model User
      const user = await userService.saveUser(req.body, role, transaction);
      const userId = user.id;

      // create user with correct data depending on role
      if (role === roles.librarian) await userService.saveLibrarian(userId, req, transaction);
      else if (role === roles.member) await userService.saveMember(userId, req, transaction);
      else if (role === roles.admin) await models.Admin.create({ userId }, { transaction });

      // commit transaction and send response after success
      await transaction.commit();
      return res.status(201).json({ message: responseMessage.createSuccess(modelNames[role]) });
    } catch (error) {
      await transaction.rollback();
      if (error.original.constraint === 'user_email_key') {
        throw errors.VALIDATION(responseMessage.uniqueUserError);
      }
      throw error;
    }
  });
};

exports.updateUser = async (model, id, userData, requestedUserData) => {
  const transaction = await models.sequelize.transaction();
  try {
    await userService.updateAndSaveUser(requestedUserData, model, id, transaction);
    await userService.updateAndSaveUser(userData, models.User, id, transaction);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

exports.retrieveLoggedUser = () => {
  return callbackErrorHandler(async function (req, res) {
    const loggedUser = req.authData;
    const data = await userService.getLoggedUserData(loggedUser);
    return res.status(200).json({ data });
  });
};

const hashAlgorithm = (value) => {
  const salt = bcrypt.genSaltSync(10);
  const hashValue = bcrypt.hashSync(value, salt);
  return hashValue;
};

exports.changePassword = () => {
  return callbackErrorHandler(async function (req, res) {
    const loggedUser = req.authData;
    const { oldPassword, newPassword } = req.body;

    const currentPassword = await userService.retrieveUsersCurrentPassword(loggedUser.userId);
    if (!bcrypt.compareSync(oldPassword, currentPassword)) throw errors.VALIDATION(responseMessage.incorrectOldPassword);

    const newPasswordHashed = hashAlgorithm(newPassword);
    await userService.updateAndSaveUser({ password: newPasswordHashed }, models.User, loggedUser.userId);

    return res.status(200).json({ message: responseMessage.updatePasswordSuccess });
  });
};

exports.createAndSendPasswordResetToken = () => {
  return callbackErrorHandler(async function (req, res) {
    const user = await userService.retrieveUserByEmail(req.body.email);

    // delete resetToken if user already has one
    resetPasswordService.deleteResetToken(user.id);

    // create new resetToken and hash it
    const resetToken = crypto.randomBytes(10).toString('hex');
    const resetTokenHash = hashAlgorithm(resetToken);

    // add resetToken data to DB
    const expirationTime = new Date(Date.now() + Number(process.env.RESET_TOKEN_EXPIRATION));
    const data = { userId: user.id, token: resetTokenHash, expirationTime };
    await resetPasswordService.createResetToken(data);

    // send user password reset email
    const emailData = { username: user.firstName, email: user.email, userId: user.id, token: resetToken };
    await resetPasswordService.sendPasswordResetLink(emailData);

    res.status(201).send({ message: responseMessage.passwordResetLink });
  });
};

exports.resetPassword = () => {
  return callbackErrorHandler(async function (req, res) {
    const { user, token, email } = req.query;

    const passwordResetUser = await models.PasswordReset.findOne({ where: { userId: user } });

    if (!passwordResetUser ||
      !bcrypt.compareSync(token, passwordResetUser.token) ||
      passwordResetUser.expirationTime < new Date()
    ) throw errors.VALIDATION(responseMessage.resetTokenExpired);

    const newPasswordHashed = hashAlgorithm(req.body.newPassword);

    await userService.updateAndSaveUser({ password: newPasswordHashed }, models.User, user);
    await resetPasswordService.deleteResetToken(user);
    await resetPasswordService.sendPasswordChangeEmail(email);

    res.status(200).send({ message: responseMessage.updatePasswordSuccess });
  });
};
