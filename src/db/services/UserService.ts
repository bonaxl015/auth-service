import { CreateUserDTO, GetUserDTO, UpdateUserDTO } from '@api/dto/user.dto';
import userDal from '@db/dal/user';
import userMapper from '@db/mappers/user/userMapper';
import { User } from '@db/models';
import { CreateUserInput, UpdateUserInput } from '@db/types/user.types';
import { ErrorNames } from '@enums/errorNames';
import ResponseCodes from '@enums/responseCodes';
import ResponseMessage from '@enums/responseMessages';
import ErrorResponse from '@utils/errorResponse';
import { returnSuccess } from '@utils/returnData';
import ReturnData from '@utils/returnData/returnData';
import { BaseError } from 'sequelize';

const getById = async (
  id: number,
): Promise<ReturnData<GetUserDTO> | BaseError | null> => {
  let returnData: ReturnData<GetUserDTO> | ErrorResponse | null = null;
  const userResult = await userDal.getById(id);

  if (userResult instanceof BaseError) {
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

const create = async (
  payload: CreateUserInput,
): Promise<ReturnData<CreateUserDTO> | ErrorResponse | null> => {
  let returnData: ReturnData<CreateUserDTO> | ErrorResponse | null = null;
  const userResult = await userDal.create(payload);

  if (userResult instanceof BaseError) {
    returnData = new ErrorResponse(
      userResult.name,
      userResult.message,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (userResult instanceof User) {
    const userDto = userMapper.toDTO(userResult);
    returnData = returnSuccess<CreateUserDTO>(
      userDto,
      ResponseCodes.REQUEST_OK,
      ResponseMessage.SUCCESS,
    );
  }

  return returnData;
};

const update = async (
  id: number,
  payload: UpdateUserInput,
): Promise<ReturnData<UpdateUserDTO> | ErrorResponse | null> => {
  let returnData: ReturnData<UpdateUserDTO> | ErrorResponse | null = null;
  const userResult = await userDal.update(id, payload);

  if (userResult instanceof BaseError) {
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

const deleteById = async (
  id: number,
): Promise<ReturnData<null> | BaseError | null> => {
  let returnData: ReturnData<null> | ErrorResponse | null = null;
  const userResult = await userDal.deleteById(id);

  if (userResult instanceof BaseError) {
    returnData = new ErrorResponse(
      userResult.name,
      userResult.message,
      ResponseCodes.BAD_REQUEST,
    );
  }

  if (typeof userResult === 'boolean') {
    if (userResult) {
      returnData = returnSuccess<null>(
        null,
        ResponseCodes.REQUEST_OK,
        ResponseMessage.SUCCESS,
      );
    } else {
      returnData = new ErrorResponse(
        ErrorNames.DELETE_FAILED,
        ResponseMessage.UNABLE_TO_DELETE,
        ResponseCodes.BAD_REQUEST,
      );
    }
  }

  return returnData;
};

const userService = {
  getById,
  create,
  update,
  deleteById,
};

export default userService;
