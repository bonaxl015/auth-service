import request, { Response } from 'supertest';
import app from '@src/app';
import ResponseStatus from '@enums/responseStatus';
import ResponseCodes from '@enums/responseCodes';
import { CreateUserInput } from '@db/types/user.types';
import { UserURL } from '../url.enums';
import ResponseMessage from '@enums/responseMessages';

const createUrl: string = `/api${UserURL.CREATE}`;
const updateUrl: string = `/api${UserURL.UPDATE}`;

describe('User routes', () => {
  let userId: number;
  const userCreate: CreateUserInput = {
    username: 'updateuser',
    password: 'updateuser',
    firstName: 'Update',
    lastName: 'User',
  };
  const userUpdate: CreateUserInput = {
    username: 'updateuser',
    password: 'updateuser',
    firstName: 'Update',
    lastName: 'User',
  };

  it('should edit an existing user', async () => {
    const response: Response = await request(app)
      .post(createUrl)
      .send(userCreate);
    userId = response.body.data.id;
    const responseUpdate: Response = await request(app)
      .put(updateUrl)
      .send({
        ...userUpdate,
        id: userId,
      });

    expect(responseUpdate.status).toBe(ResponseCodes.SUCCESS);
    expect(responseUpdate.body.code).toBe(ResponseCodes.REQUEST_OK);
    expect(responseUpdate.body.message).toBe(ResponseMessage.SUCCESS);
    expect(responseUpdate.body.status).toBe(ResponseStatus.SUCCESS);
    expect(responseUpdate.body.data).toHaveProperty('id');
    expect(responseUpdate.body.data.username).toBe(userUpdate.username);
    expect(responseUpdate.body.data.password).toBe(undefined);
    expect(responseUpdate.body.data.firstName).toBe(userUpdate.firstName);
    expect(responseUpdate.body.data.lastName).toBe(userUpdate.lastName);
  });
});
