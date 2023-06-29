const models = require('../database/models');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/constant-messages');
const { roles } = require('../utils/constant-values');

exports.saveUser = async (requestBody, userRole, transaction) => {
  // data needed to created model User
  const { firstName, lastName, email, password } = requestBody;
  const roleId = userRole;
  const userData = { firstName, lastName, email, password, roleId };
  // create model User
  const user = await models.User.create(userData, { transaction });
  return user;
};

exports.saveLibrarian = async (userId, req, transaction) => {
  // data needed to create model Librarian
  const { address, dateOfBirth } = req.body;
  const librarianData = { userId, address, dateOfBirth };
  // create model Librarian
  const librarian = await models.Librarian.create(librarianData, { transaction });
  return librarian;
};

exports.saveMember = async (userId, req, transaction) => {
  // data needed to create model Member
  const { address, dateOfBirth } = req.body;
  const memberData = { userId, address, dateOfBirth };
  // create model Member
  const member = await models.Member.create(memberData, { transaction });
  return member;
};

exports.updateAndSaveUser = async (requestedUserData, model, id, transaction) => {
  const userId = model.name === 'User' ? 'id' : 'userId';
  if (Object.keys(requestedUserData).length) {
    const [updatedRows, _updatedModel] = await model.update(requestedUserData, {
      where: { [userId]: id },
      returning: true,
      transaction
    });
    if (!updatedRows) {
      throw errors.NOT_FOUND(responseMessage.notFound(model.name));
    }
  }
};

exports.retrieveUserByEmail = async (userEmail) => {
  const user = await models.User.findOne({
    where: { email: userEmail }
  });
  if (!user) throw errors.NOT_FOUND(responseMessage.notFound(models.User.name));
  return user;
};

const retrieveDataByUserId = async (userId, model) => {
  const myModel = await model.findOne({
    where: { userId }
  });
  if (!myModel) throw errors.NOT_FOUND(responseMessage.notFound(model.name));
  return myModel;
};
exports.retrieveDataByUserId = retrieveDataByUserId;

exports.getUserByType = async (user) => {
  switch (user.roleId) {
    case roles.admin:
      return retrieveDataByUserId(user.id, models.Admin);
    case roles.librarian:
      return retrieveDataByUserId(user.id, models.Librarian);
    case roles.member:
      return retrieveDataByUserId(user.id, models.Member);
  }
};

const retrieveDataById = async (id, model) => {
  const myModel = await model.findOne({
    where: { id },
    attributes: { exclude: ['id', 'userId'] },
    include: [{
      model: models.User,
      attributes: { exclude: ['password', 'id', 'userId', 'roleId'] }
    }]
  });
  if (!myModel) throw errors.NOT_FOUND(responseMessage.notFound(model.name));
  return myModel;
};

exports.getLoggedUserData = async (user) => {
  switch (user.role) {
    case roles.admin:
      return retrieveDataById(user.id, models.Admin);
    case roles.librarian:
      return retrieveDataById(user.id, models.Librarian);
    case roles.member:
      return retrieveDataById(user.id, models.Member);
  }
};

exports.retrieveUsersCurrentPassword = async (id) => {
  const user = await models.User.findOne(
    {
      where: { id },
      attributes: ['password']
    });
  if (!user) throw errors.NOT_FOUND(responseMessage.notFound(models.User.name));
  return user.password;
};
