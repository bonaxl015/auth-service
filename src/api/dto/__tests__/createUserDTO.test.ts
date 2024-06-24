import { CreateUserDTO } from '../user.dto';

describe('CreateUserDTO', () => {
  it('should create a valid DTO object', () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const user: CreateUserDTO = {
      username: 'testuser',
      password: 'password',
      firstName: 'testuser',
      lastName: 'testuser',
      createdAt,
      updatedAt,
    };

    expect(user).toHaveProperty('username', 'testuser');
    expect(user).toHaveProperty('password', 'password');
    expect(user).toHaveProperty('firstName', 'testuser');
    expect(user).toHaveProperty('lastName', 'testuser');
    expect(user).toHaveProperty('createdAt', createdAt);
    expect(user).toHaveProperty('updatedAt', updatedAt);
  });
});
