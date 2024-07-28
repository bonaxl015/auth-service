import authDal from '@db/dal/auth';
import userMapper from '@db/mappers/user/userMapper';
import { User } from '@db/models';
import { LoginUserInput, UpdateUserInput } from '@db/types/auth.types';
import { CreateUserInput } from '@db/types/user.types';
import { ErrorNames } from '@enums/errorNames';
import ResponseCodes from '@enums/responseCodes';
import ResponseMessage from '@enums/responseMessages';
import ErrorResponse from '@utils/errorResponse';
import { returnSuccess } from '@utils/returnData';
import ReturnData from '@utils/returnData/returnData';
import {
  RegisterUserDTO,
  LoginUserDTO,
  GetUserDTO,
  UpdateUserDTO,
} from '@api/dto/auth.dto';

const register = async (
  payload: CreateUserInput,
): Promise<ReturnData<string> | Error | null> => {
  let returnData: ReturnData<string> | ErrorResponse | null = null;
  const userResult = await authDal.register(payload);

  if (!userResult) {
    returnData = new ErrorResponse(
      ErrorNames.EMPTY_TOKEN,
      ResponseMessage.UNABLE_TO_GET_TOKEN,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (userResult instanceof Error) {
    returnData = new ErrorResponse(
      userResult.name,
      userResult.message,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (userResult instanceof User) {
    const userDto: RegisterUserDTO = userMapper.toDTO(userResult);
    const userJwt = User.getSignedJwtToken(userDto);
    returnData = returnSuccess<string>(
      userJwt,
      ResponseCodes.REQUEST_OK,
      ResponseMessage.SUCCESS,
    );
  }

  return returnData;
};

const login = async (
  payload: LoginUserInput,
): Promise<ReturnData<string> | Error | null> => {
  let returnData: ReturnData<string> | ErrorResponse | null = null;

  if (!payload.username) {
    return new ErrorResponse(
      ErrorNames.EMPTY_USERNAME,
      ResponseMessage.USERNAME_REQUIRED,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (!payload.password) {
    return new ErrorResponse(
      ErrorNames.EMPTY_PASSWORD,
      ResponseMessage.PASSWORD_REQUIRED,
      ResponseCodes.BAD_REQUEST,
    );
  }

  const userResult = await authDal.findByUsername(payload);

  if (!userResult) {
    returnData = new ErrorResponse(
      ErrorNames.USER_NOT_FOUND,
      ResponseMessage.USER_NOT_FOUND,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (userResult instanceof Error) {
    returnData = new ErrorResponse(
      userResult.name,
      userResult.message,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (userResult instanceof User) {
    const isPasswordMatch: boolean = userResult.validatePassword(
      payload.password,
    );
    if (isPasswordMatch) {
      const userDto: LoginUserDTO = userMapper.toDTO(userResult);
      const userJwt = User.getSignedJwtToken(userDto);
      returnData = returnSuccess<string>(
        userJwt,
        ResponseCodes.REQUEST_OK,
        ResponseMessage.SUCCESS,
      );
    } else {
      returnData = new ErrorResponse(
        ErrorNames.USER_PASSWORD_NOT_MATCH,
        ResponseMessage.USERNAME_PASSWORD_NOT_MATCH,
        ResponseCodes.BAD_REQUEST,
      );
    }
  }

  return returnData;
};

const logout = (): Promise<ReturnData<null>> =>
  new Promise((resolve) => {
    resolve(
      returnSuccess<null>(
        null,
        ResponseCodes.REQUEST_OK,
        ResponseMessage.SUCCESS,
      ),
    );
  });

const update = async (
  id: number,
  payload: UpdateUserInput,
): Promise<ReturnData<UpdateUserDTO> | ErrorResponse | null> => {
  let returnData: ReturnData<UpdateUserDTO> | ErrorResponse | null = null;
  const userResult = await authDal.update(id, payload);

  if (userResult instanceof Error) {
    returnData = new ErrorResponse(
      userResult.name,
      userResult.message,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (userResult instanceof User) {
    const userDto = userMapper.toDTO(userResult);
    returnData = returnSuccess<UpdateUserDTO>(
      userDto,
      ResponseCodes.REQUEST_OK,
      ResponseMessage.SUCCESS,
    );
  }

  return returnData;
};

const getById = async (
  id: number,
): Promise<ReturnData<GetUserDTO> | Error | null> => {
  let returnData: ReturnData<GetUserDTO> | ErrorResponse | null = null;
  const userResult = await authDal.getById(id);

  if (userResult instanceof Error) {
    returnData = new ErrorResponse(
      userResult.name,
      userResult.message,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (userResult === null) {
    returnData = new ErrorResponse(
      ErrorNames.DATA_NOT_FOUND,
      ResponseMessage.USER_NOT_FOUND,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (userResult instanceof User) {
    const userDto = userMapper.toDTO(userResult);
    returnData = returnSuccess<GetUserDTO>(
      userDto,
      ResponseCodes.REQUEST_OK,
      ResponseMessage.SUCCESS,
    );
  }

  return returnData;
};

const authService = {
  register,
  login,
  update,
  logout,
  getById,
};

export default authService;
