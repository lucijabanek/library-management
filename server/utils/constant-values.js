module.exports.paginationValues = {
  DEFAULT_LIMIT: 10,
  DEFAULT_OFFSET: 0,
  DEFAULT_PAGE: 0
};

const roles = {
  member: '0cf1e55d-487d-4260-82fb-19983e0ca98c',
  librarian: 'd1517e70-26d0-4b01-9400-0a0113e26ed7',
  admin: '4d5108fc-c6a8-4a06-9454-d549e4bd4cc8'
};

exports.roles = roles;

exports.modelNames = {
  [roles.librarian]: 'Librarian',
  [roles.member]: 'Member',
  [roles.admin]: 'Admin'
};

exports.BOOK_LIMIT = 3;
exports.PRICE_PER_DAY = 0.10;
exports.DAY_TO_MS = 24 * 60 * 60 * 1000;
exports.MS_TO_DAY = 1000 / 60 / 60 / 24;

exports.excludedFields = {
  book: ['id', 'isbn', 'dateOfRelease', 'tags', 'authorId', 'isActive'],
  user: ['id', 'firstName', 'lastName', 'password', 'roleId', 'createdAt', 'updatedAt'],
  member: ['id', 'address', 'dateOfBirth', 'isActive', 'subscriptionExpirationDate', 'bookLimit', 'history', 'createdAt', 'updatedAt']
};
