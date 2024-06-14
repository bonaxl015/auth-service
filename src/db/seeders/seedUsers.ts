import { User } from '@db/models';
import { CreateUserInput } from '@db/types/user.types';

const userData: CreateUserInput[] = [
  {
    username: 'wally',
    firstName: 'Wally',
    lastName: 'Bayola',
    password: 'wally123',
  },
  {
    username: 'vicsotto',
    firstName: 'Vic',
    lastName: 'Sotto',
    password: 'VicSotto123',
  },
  {
    username: 'dingdongdantes',
    firstName: 'Dingdong',
    lastName: 'Dantes',
    password: 'dingdongdantes',
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
