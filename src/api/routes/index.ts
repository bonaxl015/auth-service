import { Router } from 'express';
import userRoutes from './user';
import { PrefixURL } from './url.enums';

const mainRoutes: Router = Router();

mainRoutes.use(PrefixURL.MAIN, userRoutes);

export default mainRoutes;
