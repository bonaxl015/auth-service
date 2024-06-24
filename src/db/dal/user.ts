import { User } from '@db/models';
import { CreateUserInput, UpdateUserInput } from '@db/types/user.types';
import { BaseError } from 'sequelize';

const getById = async (id: number): Promise<User | BaseError | null> => {
  let user: User | BaseError | null = null;
  try {
    user = await User.findByPk(id);
  } catch (err: any) {
    console.log(`[ERROR] ${err}`);
    user = err;
  }
  return user;
};

const create = async (
  payload: CreateUserInput,
): Promise<User | BaseError | null> => {
  let user: User | BaseError | null = null;
  try {
    user = await User.create(payload);
  } catch (err: any) {
    console.log(`[ERROR] ${err}`);
    user = err;
  }

  return user;
};

const update = async (
  id: number,
  payload: UpdateUserInput,
): Promise<User | BaseError | null> => {
  let user: User | BaseError | null = null;
  let updatedUser: User | BaseError | null = null;
  try {
    user = await getById(id);
    if (user instanceof User) {
      updatedUser = await user.update(payload);
    }
  } catch (err: any) {
    console.log(`[ERROR] ${err}`);
    updatedUser = err;
  }

  return updatedUser;
};

const deleteById = async (id: number): Promise<boolean | BaseError> => {
  let user: User | BaseError | null = null;
  let deleteUserResponse: number | BaseError = 0;
  try {
    user = await getById(id);
    if (user instanceof User) {
      deleteUserResponse = await User.destroy({
        where: { id },
      });
    }
  } catch (err: any) {
    console.log(`[ERROR] ${err}`);
    deleteUserResponse = err;
  }

  return deleteUserResponse instanceof BaseError
    ? deleteUserResponse
    : Boolean(deleteUserResponse);
};

const userDal = {
  getById,
  create,
  update,
  deleteById,
};

export default userDal;
