import { Router } from 'express';
import { UserURL } from '../url.enums';
import {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '@api/controllers/user';
import { idValidate } from '@middlewares/routes/validations/idValidate';

const userRoutes: Router = Router();

userRoutes.route(UserURL.GET_BY_ID).get(idValidate, getUserById);
userRoutes.route(UserURL.CREATE).post(createUser);
userRoutes.route(UserURL.UPDATE).put(idValidate, updateUser);
userRoutes.route(UserURL.DELETE).delete(idValidate, deleteUser);

export default userRoutes;
