import { Model } from 'sequelize';
import { User } from './models';
import dotenv from 'dotenv';
import { CreateUserInput, UserAttributes } from './types/user.types';

dotenv.config();

const isDev: boolean = process.env.NODE_ENV === 'development';

const dbInit = (): Promise<[Model<UserAttributes, CreateUserInput>]> =>
  Promise.all([User.sync({ alter: isDev })]);

export default dbInit;
