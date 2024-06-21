enum ResponseMessage {
  SUCCESS = 'Operation success',
  FAIL = 'Operation failed',
  INVALID_REQUEST = 'Invalid request',
  ID_REQUIRED = 'ID cannot be empty',
  ID_INVALID = 'ID is invalid',
  UNABLE_TO_DELETE = 'Unable to delete',
  USER_NOT_FOUND = 'User not found',
}

export default ResponseMessage;
