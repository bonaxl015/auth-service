import request, { Response } from 'supertest';
import app from '@src/app';
import ResponseStatus from '@enums/responseStatus';
import ResponseCodes from '@enums/responseCodes';
import { CreateUserInput } from '@db/types/user.types';
import { UserURL } from '../url.enums';
import ResponseMessage from '@enums/responseMessages';

const createUrl: string = `/api${UserURL.CREATE}`;
const deleteUrl: string = `/api${UserURL.DELETE}`;

describe('User routes', () => {
  let userId: number;
  const userRequest: CreateUserInput = {
    username: 'deleteuser',
    password: 'deleteuser',
    firstName: 'Delete',
    lastName: 'User',
  };

  it('should delete an existing user by its user id', async () => {
    const response: Response = await request(app)
      .post(createUrl)
      .send(userRequest);
    userId = response.body.data.id;
    const responseDelete: Response = await request(app)
      .delete(deleteUrl)
      .send({ id: userId });

    expect(responseDelete.status).toBe(ResponseCodes.SUCCESS);
    expect(responseDelete.body.code).toBe(ResponseCodes.REQUEST_OK);
    expect(responseDelete.body.message).toBe(ResponseMessage.SUCCESS);
    expect(responseDelete.body.status).toBe(ResponseStatus.SUCCESS);
    expect(responseDelete.body.data).toBe(null);
  });

  it('should return error response when deleting non-existing user id', async () => {
    userId = 999;
    const responseDelete: Response = await request(app)
      .delete(deleteUrl)
      .send({ id: userId });

    expect(responseDelete.status).toBe(ResponseCodes.BAD_REQUEST);
    expect(responseDelete.body.code).toBe(ResponseCodes.REQUEST_FAIL);
    expect(responseDelete.body.message).toBe(ResponseMessage.UNABLE_TO_DELETE);
    expect(responseDelete.body.status).toBe(ResponseStatus.FAIL);
    expect(responseDelete.body.data).toBe(null);
  });
});
