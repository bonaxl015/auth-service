import { Request, Response, NextFunction } from 'express';
import userService from '@db/services/UserService';
import asyncHandler from '@middlewares/global/async-handler';
import ErrorResponse from '@utils/errorResponse';
import ResponseCodes from '@enums/responseCodes';
import { CreateUserInput, UpdateUserInput } from '@db/types/user.types';

export const getUserById = asyncHandler(
  async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void | Response> => {
    const id: number = Number(req.params.id);
    const results = await userService.getById(id);

    if (results instanceof ErrorResponse) {
      throw results;
    }

    return res.status(ResponseCodes.SUCCESS).send(results);
  },
);

export const createUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void | Response> => {
    const payload: CreateUserInput = req.body;
    const results = await userService.create(payload);

    if (results instanceof ErrorResponse) {
      throw results;
    }

    return res.status(ResponseCodes.SUCCESS).send(results);
  },
);

export const updateUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void | Response> => {
    const id: number = Number(req.body.id);
    const payload: UpdateUserInput = req.body;

    const results = await userService.update(id, payload);

    if (results instanceof Error) {
      throw results;
    }

    return res.status(ResponseCodes.SUCCESS).send(results);
  },
);

export const deleteUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void | Response> => {
    const id: number = Number(req.body.id);

    const results = await userService.deleteById(id);

    if (results instanceof ErrorResponse) {
      throw new ErrorResponse(
        results.name,
        results.message,
        ResponseCodes.NOT_FOUND,
      );
    }

    return res.status(ResponseCodes.SUCCESS).send(results);
  },
);
