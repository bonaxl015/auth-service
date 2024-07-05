import request, { Response } from 'supertest';
import app from '@src/app';
import ResponseStatus from '@enums/responseStatus';
import ResponseCodes from '@enums/responseCodes';
import { CreateUserInput } from '@db/types/user.types';
import { UserURL } from '../url.enums';
import ResponseMessage from '@enums/responseMessages';

const createUrl: string = `/api${UserURL.CREATE}`;

describe('User routes', () => {
  const userRequest: CreateUserInput = {
    username: 'newuser',
    password: 'newuser',
    firstName: 'New',
    lastName: 'User',
  };

  it('should create a new user', async () => {
    const response: Response = await request(app)
      .post(createUrl)
      .send(userRequest);

    expect(response.status).toBe(ResponseCodes.SUCCESS);
    expect(response.body.code).toBe(ResponseCodes.REQUEST_OK);
    expect(response.body.message).toBe(ResponseMessage.SUCCESS);
    expect(response.body.status).toBe(ResponseStatus.SUCCESS);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.username).toBe(userRequest.username);
    expect(response.body.data.password).toBe(undefined);
    expect(response.body.data.firstName).toBe(userRequest.firstName);
    expect(response.body.data.lastName).toBe(userRequest.lastName);
  });
});
