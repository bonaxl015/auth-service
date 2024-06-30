import { Sequelize } from 'sequelize';
import { CurrentEnvironment } from './types';
import configMapping from './mapping';

const currentEnv: CurrentEnvironment = process.env
  .NODE_ENV as CurrentEnvironment;
const isTest: boolean = currentEnv === 'test';

const sequelizeConnection: Sequelize = new Sequelize(
  configMapping[currentEnv].database,
  configMapping[currentEnv].user,
  configMapping[currentEnv].password,
  {
    database: configMapping[currentEnv].database,
    username: configMapping[currentEnv].user,
    password: configMapping[currentEnv].password,
    host: configMapping[currentEnv].host,
    port: Number(configMapping[currentEnv].port),
    dialect: isTest ? 'sqlite' : 'postgres',
    storage: isTest ? ':memory:' : undefined,
    dialectOptions: isTest
      ? undefined
      : {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
  },
);

// Function to check the connection
export const checkConnection = async (): Promise<void> => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelizeConnection;
