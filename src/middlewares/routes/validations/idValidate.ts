import { ErrorNames } from '@enums/errorNames';
import ResponseCodes from '@enums/responseCodes';
import ResponseMessage from '@enums/responseMessages';
import errorHandler from '@middlewares/global/error-handler';
import ErrorResponse from '@utils/errorResponse';
import isNumber from '@utils/helpers/isNumber';
import { NextFunction, Request, Response } from 'express';

let error: ErrorResponse | null = null;

export const idValidate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const idParam: number | string | undefined = req.params.id || req.body.id;

  if (idParam === 0 || !isNumber(Number(idParam))) {
    error = new ErrorResponse(
      ErrorNames.INVALID_PARAMETER,
      ResponseMessage.ID_INVALID,
      ResponseCodes.NOT_FOUND,
    );
  }

  if (idParam === '' || idParam === null || idParam === undefined) {
    error = new ErrorResponse(
      ErrorNames.MISSING_PARAMETER,
      ResponseMessage.ID_REQUIRED,
      ResponseCodes.NOT_FOUND,
    );
  }

  if (!error) {
    next();
  } else {
    errorHandler(error, req, res, next);
  }

  // reset error value
  error = null;
};
