const { ApiError } = require('../middleware/error-handlers');

module.exports.errors = {
  FORBIDDEN: (details) => new ApiError('Forbidden', 403, details),
  NOT_FOUND: (details) => new ApiError('Not found', 404, details),
  UNAUTHORIZED: (details) => new ApiError('Unauthorized access', 401, details),
  VALIDATION: (details) => new ApiError('Invalid input', 400, details),
  CONFLICT: (details) => new ApiError('Conflict in the request', 409, details)

};
