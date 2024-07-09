import { User } from '@db/models';
import { CreateUserInput } from '@db/types/user.types';

const userData: CreateUserInput[] = [
  {
    username: 'wally',
    firstName: 'Wally',
    lastName: 'Bayola',
    password: 'password',
  },
  {
    username: 'vicsotto',
    firstName: 'Vic',
    lastName: 'Sotto',
    password: 'password',
  },
  {
    username: 'dingdongdantes',
    firstName: 'Dingdong',
    lastName: 'Dantes',
    password: 'password',
  },
];

const seedUsers = async (): Promise<void> => {
  try {
    await User.bulkCreate(userData);
    console.log('[SEEDER] Users have been seeded');
  } catch (error) {
    console.log(`[ERROR] ${error}`);
    process.exit(1);
  }
};

export default seedUsers;
