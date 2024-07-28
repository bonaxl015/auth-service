enum ResponseMessage {
  SUCCESS = 'Operation success',
  FAIL = 'Operation failed',
  INVALID_REQUEST = 'Invalid request',
  ID_REQUIRED = 'ID cannot be empty',
  ID_INVALID = 'ID is invalid',
  UNABLE_TO_DELETE = 'Unable to delete',

  // auth response message
  USER_NOT_FOUND = 'User not found',
  UNABLE_TO_GET_TOKEN = 'Unable to get token',
  USERNAME_REQUIRED = 'Username cannot be empty',
  PASSWORD_REQUIRED = 'Password cannot be empty',
  USERNAME_PASSWORD_NOT_MATCH = 'Username and password did not match',
}

export default ResponseMessage;
