import {Request, Response} from 'express'

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
}
