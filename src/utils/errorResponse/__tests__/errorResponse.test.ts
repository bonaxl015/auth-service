import ErrorResponse from '../index';
import ResponseCodes from '@enums/responseCodes';

describe('ErrorResponse', () => {
  it('should create a class instance', () => {
    const name = 'MockErrorResponse';
    const message = 'Mock error message';
    const statusCode = ResponseCodes.BAD_REQUEST;
    const errorResponse = new ErrorResponse(name, message, statusCode);

    expect(errorResponse).toHaveProperty('name');
    expect(errorResponse).toHaveProperty('message');
    expect(errorResponse).toHaveProperty('statusCode');
  });

  it('should return the correct output', () => {
    const name = 'MockErrorResponse';
    const message = 'Mock error message';
    const statusCode = ResponseCodes.BAD_REQUEST;
    const errorResponse = new ErrorResponse(name, message, statusCode);

    expect(errorResponse.name).toBe(name);
    expect(errorResponse.message).toBe(message);
    expect(errorResponse.statusCode).toBe(statusCode);
  });
});
