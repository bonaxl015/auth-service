import dotenv from 'dotenv';
import { isProduction } from '@utils/helpers/isProduction';
import { CookieOptions } from 'express';

dotenv.config();

const jwtCookieExpireEnv: number = Number(process.env.JWT_COOKIE_EXPIRE) || 3;
const jwtCookieExpire = jwtCookieExpireEnv * 24 * 60 * 60 * 1000;

export const cookieOptions: CookieOptions = {
  expires: new Date(Date.now() + jwtCookieExpire),
  httpOnly: true,
  secure: isProduction(),
  sameSite: 'lax',
  path: '/',
  domain: isProduction() ? `.${process.env.DOMAIN}` : '',
  maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
};
