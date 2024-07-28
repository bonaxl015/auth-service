import { Op } from 'sequelize';
import { User } from '@db/models';
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateUserInput,
} from '@db/types/auth.types';
import userDal from './user';
import { UserDalData } from './types';

const register = async (payload: RegisterUserInput): Promise<UserDalData> => {
  let user: UserDalData = null;
  user = await userDal.create(payload);

  return user;
};

const findByUsername = async (
  payload: LoginUserInput,
): Promise<UserDalData> => {
  let user: UserDalData = null;

  try {
    user = await User.findOne({
      where: {
        username: {
          [Op.eq]: payload.username,
        },
      },
    });
  } catch (err: any) {
    console.log(`[ERROR] ${err}`);
    user = err;
  }

  return user;
};

const update = async (
  id: number,
  payload: UpdateUserInput,
): Promise<UserDalData> => {
  let updatedUser: UserDalData = null;

  updatedUser = await userDal.update(id, payload);

  return updatedUser;
};

const getById = async (id: number): Promise<UserDalData> => {
  let user: UserDalData = null;

  user = await userDal.getById(id);

  return user;
};

const authDal = {
  register,
  findByUsername,
  update,
  getById,
};

export default authDal;
