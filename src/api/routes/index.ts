import { Router } from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import { PrefixURL } from './url.enums';

const mainRoutes: Router = Router();

mainRoutes.use(PrefixURL.MAIN, userRoutes);
mainRoutes.use(PrefixURL.MAIN, authRoutes);

export default mainRoutes;
