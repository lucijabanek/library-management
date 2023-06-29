const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const responseMessage = require('../utils/constant-messages');
const { errors } = require('../utils/errors');
const { callbackErrorHandler } = require('../middleware/error-handlers');

const tokenVerification = (authorizationHeaders) => {
  const tokenString = authorizationHeaders;
  const token = tokenString.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken;
  } catch (error) {
    throw errors.UNAUTHORIZED(responseMessage.invalidToken);
  }
};

const validateToken = (req) => {
  if (!req.headers.authorization) throw errors.UNAUTHORIZED(responseMessage.missingAuthorization);
  const loggedUser = tokenVerification(req.headers.authorization);
  return loggedUser;
};

exports.authorizeUser = (roles) => {
  return callbackErrorHandler(async function (req, res, next) {
    const loggedUser = validateToken(req);
    if (!roles.some(role => loggedUser.role === role)) throw errors.FORBIDDEN(responseMessage.UserTypeAndIdAndPermission);
    req.authData = loggedUser;
    return next();
  });
};
