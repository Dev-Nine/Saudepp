import {Request, Response} from 'express'
import * as jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

import AuthenticateUserService from '../services/AuthenticateUserService'

export default class SessionController {
   public async auth (req: Request, res: Response, next): Promise<any> {
      try {
         const {email, username, password} = req.body;
         const authenticateUser = new AuthenticateUserService();

         const {user, token} = await authenticateUser.execute({
            email,
            username,
            password
         })
         delete user.password;

         return res.json({user, token})

      } catch(err) {
         return next(err);
      }
   }

   public async index (req: Request, res: Response, next) : Promise<any> {
      return res.status(204).send();
   }
}
