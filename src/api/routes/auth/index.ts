import { Router } from 'express';
import { AuthURL } from '../url.enums';
import {
  register,
  login,
  logout,
  updateUser,
  getUser,
} from '@api/controllers/auth';

const authRoutes: Router = Router();

authRoutes.route(AuthURL.REGISTER).post(register);
authRoutes.route(AuthURL.LOGIN).post(login);
authRoutes.route(AuthURL.LOGOUT).post(logout);
authRoutes.route(AuthURL.UPDATE).post(updateUser);
authRoutes.route(AuthURL.GET_USER).get(getUser);

export default authRoutes;
