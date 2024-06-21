enum ResponseCodes {
  // default response codes
  SUCCESS = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,

  // custom response codes
  REQUEST_OK = 0,
  REQUEST_FAIL = 10001,
}

export default ResponseCodes;
