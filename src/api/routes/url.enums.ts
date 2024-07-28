export enum PrefixURL {
  MAIN = '/api',
}

export enum UserURL {
  GET_BY_ID = '/user/v1/get/:id',
  CREATE = '/user/v1/create',
  UPDATE = '/user/v1/update',
  DELETE = '/user/v1/delete',
}

export enum AuthURL {
  REGISTER = '/auth/v1/register',
  LOGIN = '/auth/v1/login',
  UPDATE = '/auth/v1/update',
  GET_USER = '/auth/v1/getUser/:id',
  LOGOUT = '/auth/v1/logout',
}
