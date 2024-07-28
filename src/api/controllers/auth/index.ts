import { Request, Response, NextFunction, CookieOptions } from 'express';
import authService from '@db/services/AuthService';
import { RegisterUserInput, UpdateUserInput } from '@db/types/auth.types';
import asyncHandler from '@middlewares/global/async-handler';
import ErrorResponse from '@utils/errorResponse';
import ReturnData from '@utils/returnData/returnData';
import ResponseCodes from '@enums/responseCodes';
import { cookieOptions } from './cookieOptions';

export const register = asyncHandler(
  async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void | Response> => {
    let token: string = '';
    const payload: RegisterUserInput = req.body;
    const results = await authService.register(payload);

    if (results instanceof ErrorResponse) {
      throw results;
    }
    if (results instanceof ReturnData) {
      token = results.data;
    }

    return res
      .status(ResponseCodes.SUCCESS)
      .cookie('token', token, cookieOptions)
      .send(results);
  },
);

export const login = asyncHandler(
  async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void | Response> => {
    let token: string = '';
    const payload: RegisterUserInput = req.body;
    const results = await authService.login(payload);

    if (results instanceof ErrorResponse) {
      throw results;
    }
    if (results instanceof ReturnData) {
      token = results.data;
    }

    return res
      .status(ResponseCodes.SUCCESS)
      .cookie('token', token, cookieOptions)
      .send(results);
  },
);

export const logout = asyncHandler(
  async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void | Response> => {
    const resetCookieOptions: CookieOptions = {
      ...cookieOptions,
      expires: new Date(Date.now() + 5 * 1000),
    };
    const results = await authService.logout();
    res.cookie('token', '', resetCookieOptions);

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

    const results = await authService.update(id, payload);

    if (results instanceof Error) {
      throw results;
    }

    return res.status(ResponseCodes.SUCCESS).send(results);
  },
);

export const getUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void | Response> => {
    const id: number = Number(req.params.id);
    const results = await authService.getById(id);

    if (results instanceof ErrorResponse) {
      throw results;
    }

    return res.status(ResponseCodes.SUCCESS).send(results);
  },
);
