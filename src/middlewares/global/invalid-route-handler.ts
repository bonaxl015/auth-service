import { ErrorNames } from '@enums/errorNames';
import ResponseCodes from '@enums/responseCodes';
import ErrorResponse from '@utils/errorResponse';
import { NextFunction, Request, Response } from 'express';

export const invalidRouteHandler = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const error = new ErrorResponse(
    ErrorNames.INVALID_ROUTE,
    `${req.path} not found`,
    ResponseCodes.NOT_FOUND,
  );

  next(error);
};
