import {NextFunction, Request, Response} from 'express';
import User from '../Models/User';
import type {HydratedDocument} from 'mongoose';
import type {UserFields, UserMethods} from '../types';

export interface RequestUser extends Request {
  user?: HydratedDocument<UserFields, UserMethods>;
}

export const publicGet = async (req: RequestUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (headerValue) {
    const [_bearer, token] = headerValue.split(' ');

    if (token) {
      const user = await User.findOne({token});
      if (user) {
        req.user = user;
      }
    }
    if (!token) {
      return next()
    }
  }

  return next();
};