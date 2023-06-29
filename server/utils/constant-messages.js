const responseMessage = {
  // common functions
  notFound: (modelName) => `${modelName} not found!`,
  notFoundJoinTable: (modelName) => `Combination is not found in a join table ${modelName}`,
  deleteSuccess: (modelName) => `${modelName} successfully deleted!`,
  updateSuccess: (modelName) => `${modelName} successfully updated!`,
  createSuccess: (modelName) => `${modelName} successfully created!`,

  // Constant messages
  invalidIdType: 'Invalid ID type provided!',
  invalidISBNType: 'Invalid ISBN is provided!',
  invalidNameLength: 'Name must have at least 3 characters!',
  uniqueUserError: 'User with this email already exits!',
  uniqueISBNError: 'Book with this ISBN already exits!',
  missingAuthorization: 'Missing authorization from headers!',
  invalidToken: 'Invalid token, you are not allowed to view this page!',
  loginAuthorizationError: 'Invalid email or password!',
  loginSuccess: 'Successfully logged in!',
  updateSubscriptionSuccess: 'Successfully updated Member subscription!',
  UserTypeAndIdAndPermission: 'Only users with correct ID and ROLE have access for this action.',
  membershipExpired: 'Membership expired. Cannot lend new books until membership is renewed.',
  returnedBook: 'This book has already been returned.',
  bookSuccessfullyReturned: 'Book is successfully returned.',
  bookLimitExceeded: 'Book limit exceeded. Cannot lend more books.',
  invalidSubscriptionExpirationDate: 'The new subscription expiration date cannot be less than the previous one',
  subscriptionDeleteSuccess: 'Member Subscription successfully deleted!',
  subscriptionHistoryError: 'Action is not possible, you cannot modify last subscription expiration date!',
  updatePasswordSuccess: 'Password updated successfully!',
  incorrectOldPassword: 'Old password does not match with your current password!',
  passwordResetLink: 'Request sent, an email with password reset link has been sent to your address!',
  resetTokenExpired: 'Invalid token. This token has already been used or it has expired, you will need to request a new password reset!'
};

module.exports = responseMessage;
