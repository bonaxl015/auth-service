import { UserDTO } from '@api/dto/user.dto';
import { User } from '@db/models';

const toDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const userMapper = {
  toDTO,
};

export default userMapper;
