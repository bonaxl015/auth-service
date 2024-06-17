import sequelizeConnection from './src/db/config';

beforeAll(async () => {
  await sequelizeConnection.sync();
});

afterAll(async () => {
  await sequelizeConnection.close();
});