import { Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserInput extends Omit<UserAttributes, 'id'> {}

export interface UpdateUserInput
  extends Optional<
    UserAttributes,
    'username' | 'firstName' | 'lastName' | 'password'
  > {}

export interface UserOutput extends Omit<UserAttributes, 'password'> {}
