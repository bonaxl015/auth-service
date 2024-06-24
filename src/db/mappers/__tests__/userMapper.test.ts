import { User } from '@db/models';
import userMapper from '../user/userMapper';

describe('UserMapper', () => {
  it('should map each user values correctly', () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const userData = {
      id: 1,
      username: 'username',
      firstName: 'firstName',
      lastName: 'lastName',
      createdAt,
      updatedAt,
    };
    const userDataMapped = userMapper.toDTO(userData as User);

    expect(userDataMapped).toHaveProperty('id');
    expect(userDataMapped).toHaveProperty('username');
    expect(userDataMapped).toHaveProperty('firstName');
    expect(userDataMapped).toHaveProperty('lastName');
    expect(userDataMapped).toHaveProperty('createdAt');
    expect(userDataMapped).toHaveProperty('updatedAt');
  });

  it('should filter keys that are not included in the mapping', () => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const userData = {
      id: 1,
      username: 'username',
      firstName: 'firstName',
      lastName: 'lastName',
      createdAt,
      updatedAt,
      extraKey1: 'extraKey1',
      extraKey2: 'extraKey2',
      extraKey3: 'extraKey3',
      extraKey4: 'extraKey4',
    };
    const userDataMapped = userMapper.toDTO(userData as unknown as User);

    expect(userDataMapped).toHaveProperty('id');
    expect(userDataMapped).toHaveProperty('username');
    expect(userDataMapped).toHaveProperty('firstName');
    expect(userDataMapped).toHaveProperty('lastName');
    expect(userDataMapped).toHaveProperty('createdAt');
    expect(userDataMapped).toHaveProperty('updatedAt');
    expect(userDataMapped).not.toHaveProperty('extraKey1');
    expect(userDataMapped).not.toHaveProperty('extraKey2');
    expect(userDataMapped).not.toHaveProperty('extraKey3');
    expect(userDataMapped).not.toHaveProperty('extraKey4');
  });
});
