import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

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

      req.user = {
         id:sub
      };

      console.log(decoded);
      return next();
   } catch(err) {
      // http 403 = forbidden
      console.log(err.message);
      res.sendStatus(403);
   }
}