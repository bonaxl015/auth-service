import request, { Response } from 'supertest';
import app from '@src/app';
import ResponseStatus from '@enums/responseStatus';
import ResponseCodes from '@enums/responseCodes';
import { CreateUserInput } from '@db/types/user.types';
import { UserURL } from '../url.enums';
import ResponseMessage from '@enums/responseMessages';

const createUrl: string = `/api${UserURL.CREATE}`;
const getUrl: string = `/api${UserURL.GET_BY_ID}`.replace('/:id', '');

describe('User routes', () => {
  let userId: number;
  const userRequest: CreateUserInput = {
    username: 'otheruser',
    password: 'otheruser',
    firstName: 'Other',
    lastName: 'User',
  };

  it('should get an existing user by its user id', async () => {
    const response: Response = await request(app)
      .post(createUrl)
      .send(userRequest);
    userId = response.body.data.id;
    const responseGet: Response = await request(app).get(`${getUrl}/${userId}`);

    expect(responseGet.status).toBe(ResponseCodes.SUCCESS);
    expect(responseGet.body.code).toBe(ResponseCodes.REQUEST_OK);
    expect(responseGet.body.message).toBe(ResponseMessage.SUCCESS);
    expect(responseGet.body.status).toBe(ResponseStatus.SUCCESS);
    expect(responseGet.body.data).toHaveProperty('id');
    expect(responseGet.body.data.username).toBe(userRequest.username);
    expect(responseGet.body.data.password).toBe(undefined);
    expect(responseGet.body.data.firstName).toBe(userRequest.firstName);
    expect(responseGet.body.data.lastName).toBe(userRequest.lastName);
  });
});
