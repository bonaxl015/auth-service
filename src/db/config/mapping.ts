import dotenv from 'dotenv';
import { DBConfigMapping } from './types';

dotenv.config();

const {
  PG_HOST,
  PG_USER,
  PG_PASSWORD,
  PG_DATABASE,
  PG_PORT,
  PG_TEST_HOST,
  PG_TEST_USER,
  PG_TEST_PASSWORD,
  PG_TEST_DATABASE,
  PG_TEST_PORT,
} = process.env;

const configMapping: DBConfigMapping = {
  development: {
    database: PG_DATABASE as string,
    host: PG_HOST as string,
    user: PG_USER as string,
    password: PG_PASSWORD as string,
    port: PG_PORT as string,
  },
  test: {
    database: PG_TEST_DATABASE as string,
    host: PG_TEST_HOST as string,
    user: PG_TEST_USER as string,
    password: PG_TEST_PASSWORD as string,
    port: PG_TEST_PORT as string,
  },
  production: {
    database: PG_DATABASE as string,
    host: PG_HOST as string,
    user: PG_USER as string,
    password: PG_PASSWORD as string,
    port: PG_PORT as string,
  },
};

export default configMapping;
