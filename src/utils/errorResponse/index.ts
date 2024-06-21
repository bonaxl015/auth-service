import ResponseCodes from '@enums/responseCodes';

class ErrorResponse extends Error {
  name: string;
  message: string;
  statusCode: ResponseCodes;

  constructor(name: string, message: string, statusCode: ResponseCodes) {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
