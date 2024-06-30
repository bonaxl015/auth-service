import sequelizeConnection from './src/db/config';

beforeAll(async () => {
  await sequelizeConnection.sync({ force: true });
});

afterAll(async () => {
  await sequelizeConnection.close();
});
