import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT } = process.env;

const sequelizeConnection: Sequelize = new Sequelize(
  PG_DATABASE as string,
  PG_USER as string,
  PG_PASSWORD,
  {
    database: PG_DATABASE,
    username: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: Number(PG_PORT),
    dialect: 'postgres' as Dialect,
    dialectOptions: {
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
