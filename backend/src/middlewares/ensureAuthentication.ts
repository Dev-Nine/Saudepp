import { getConnection } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';
import { User } from '../model/User';

interface tokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

export default function ensureAuthentication(req: Request, res: Response, next: NextFunction):void {
   const authHeader = req.headers.authorization;

   try {
      if (!authHeader) {
         throw new Error('JWT Token is missing');
      }
   
      const [, token] = authHeader.split(' ');
      
      const decoded = verify(token, authConfig.jwt.secret);

      const {sub} = decoded as tokenPayload;

      getConnection().getRepository(User).findOne(sub)
         .then(function(user : User){
         if(user !== undefined){
            req.user = {
               id : sub,
               type: user.type
            };
         
            //console.log(decoded);
            return next();
         }else{
            res.status(403).send({error: "Invalid authorization"});
         }
      });
      
   } catch(err) {
      // http 401 = unauthorized
      // http 403 = forbidden
      console.log(err.message);
      res.sendStatus(401);
   }
}