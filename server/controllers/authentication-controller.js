const { callbackErrorHandler } = require('../middleware/error-handlers');
const { errors } = require('../utils/errors');
const responseMessage = require('../utils/constant-messages');
const { SECRET_KEY, EXPIRES_IN } = process.env;
const userService = require('../services/user-service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signToken = (user, userType) => {
  const token = jwt.sign({
    id: userType.id,
    userId: user.id,
    email: user.email,
    role: user.roleId
  }, SECRET_KEY, { expiresIn: EXPIRES_IN });
  return token;
};

exports.login = () => {
  return callbackErrorHandler(async function (req, res) {
    const user = await userService.retrieveUserByEmail(req.body.email);
    // validate hashed password in database matches hashed input password
    if (!bcrypt.compareSync(req.body.password, user.password)) throw errors.UNAUTHORIZED(responseMessage.loginAuthorizationError);

    const userType = await userService.getUserByType(user);

    // create jwt token
    const token = signToken(user, userType);
    res.status(200).json({ message: responseMessage.loginSuccess, token, role: user.roleId });
  });
};
