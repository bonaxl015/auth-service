import request, { Response } from 'supertest';
import app from '@src/app';
import ResponseStatus from '@enums/responseStatus';
import ResponseCodes from '@enums/responseCodes';

describe('Invalid route', () => {
  const unknownRoute: string = '/unknown';

  it('should return 404 for get request in unknown route', async () => {
    const response: Response = await request(app).get(unknownRoute);

    expect(response.status).toBe(ResponseCodes.NOT_FOUND);
    expect(response.body.code).toBe(ResponseCodes.REQUEST_FAIL);
    expect(response.body.data).toBe(null);
    expect(response.body.message).toBe(`${unknownRoute} not found`);
    expect(response.body.status).toBe(ResponseStatus.FAIL);
  });

  it('should return 404 for post request in unknown route', async () => {
    const params = {
      username: 'username',
      password: 'password',
    };
    const response = await request(app).post(unknownRoute).send(params);

    expect(response.status).toBe(ResponseCodes.NOT_FOUND);
    expect(response.body.code).toBe(ResponseCodes.REQUEST_FAIL);
    expect(response.body.data).toBe(null);
    expect(response.body.message).toBe(`${unknownRoute} not found`);
    expect(response.body.status).toBe(ResponseStatus.FAIL);
  });

  it('should return 404 for put request in unknown route', async () => {
    const params = {
      id: 1,
      username: 'username',
      password: 'password',
    };
    const response = await request(app).put(unknownRoute).send(params);

    expect(response.status).toBe(ResponseCodes.NOT_FOUND);
    expect(response.body.code).toBe(ResponseCodes.REQUEST_FAIL);
    expect(response.body.data).toBe(null);
    expect(response.body.message).toBe(`${unknownRoute} not found`);
    expect(response.body.status).toBe(ResponseStatus.FAIL);
  });

  it('should return 404 for delete request in unknown route', async () => {
    const params = {
      id: 1,
    };
    const response = await request(app).delete(unknownRoute).send(params);

    expect(response.status).toBe(ResponseCodes.NOT_FOUND);
    expect(response.body.code).toBe(ResponseCodes.REQUEST_FAIL);
    expect(response.body.data).toBe(null);
    expect(response.body.message).toBe(`${unknownRoute} not found`);
    expect(response.body.status).toBe(ResponseStatus.FAIL);
  });
});
