import { Optional } from 'sequelize';
import { UserAttributes } from './user.types';

export interface RegisterUserInput extends Omit<UserAttributes, 'id'> {}

export interface LoginUserInput
  extends Omit<
    UserAttributes,
    'id' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt'
  > {}

export interface UpdateUserInput
  extends Optional<UserAttributes, 'firstName' | 'lastName' | 'password'> {}
