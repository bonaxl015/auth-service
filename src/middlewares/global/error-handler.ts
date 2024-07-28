import { NextFunction, Request, Response } from 'express';
import ResponseCodes from '@enums/responseCodes';
import { returnFail } from '@utils/returnData';
import { ErrorHandlerFunction } from '@middlewares/types';
import ResponseMessage from '@enums/responseMessages';
import { ErrorNames } from '@enums/errorNames';

const errorHandler: ErrorHandlerFunction = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error.name === ErrorNames.SEQUELIZE_VALIDATION_ERROR) {
    const messageFormatted: string = error.message
      .split(',\n')
      .map((item) => item.replace('Validation error: ', ''))[0];
    error.message = messageFormatted;
  }

  const responseData = returnFail(
    null,
    ResponseCodes.REQUEST_FAIL,
    error.message || ResponseMessage.FAIL,
  );

  if (error.name === ErrorNames.INVALID_ROUTE) {
    response.status(ResponseCodes.NOT_FOUND).json(responseData);
  } else {
    response.status(ResponseCodes.BAD_REQUEST).json(responseData);
  }
};

export default errorHandler;
