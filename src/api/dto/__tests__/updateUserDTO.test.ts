import { UpdateUserDTO } from '../user.dto';

describe('UpdateUserDTO', () => {
  it('should create a valid DTO object', () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const user: UpdateUserDTO = {
      id: 1,
      username: 'updateuser',
      firstName: 'user',
      lastName: 'user',
      createdAt,
      updatedAt,
    };

    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('username', 'updateuser');
    expect(user).toHaveProperty('firstName', 'user');
    expect(user).toHaveProperty('lastName', 'user');
    expect(user).toHaveProperty('createdAt', createdAt);
    expect(user).toHaveProperty('updatedAt', updatedAt);
  });
});
