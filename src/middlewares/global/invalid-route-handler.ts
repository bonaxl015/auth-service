import ResponseCodes from '@enums/responseCodes';
import { returnFail } from '@utils/returnData';
import { Request, Response } from 'express';

export const invalidRouteHandler = (req: Request, res: Response): void => {
  const responseData = returnFail<null>(
    null,
    ResponseCodes.NOT_FOUND,
    `${req.path} not found`,
  );

  res.status(ResponseCodes.NOT_FOUND).json(responseData);
};
