import 'tsconfig-paths/register';
import sequelizeConnection, { checkConnection } from '@db/config';
import seedUsers from './seedUsers';

const importData = async (): Promise<void> => {
  // check database connection
  await checkConnection();
  // Drop the existing table and recreate it
  await sequelizeConnection.sync({ force: true });
  await seedUsers();

  console.log('[sequelize] Seeding completed');
  process.exit(0);
};

if (process.argv[2] === '-import') {
  importData();
}
