import { getRepository } from 'typeorm';
// import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';
import { User } from '../model/User';

interface Request {
   email: string;
   password: string;
}

interface Response {
   user: User;
   token: string;
}

export default class AuthenticateUserService {
   public async execute({email, password}: Request): Promise<Response> {
      const userRepository = getRepository(User);

      const user = await userRepository.findOne({where: {email}});

      if (!user) {
         throw new Error('Incorrect email/password combination.')
      }

      if (password !== user.password) {
         throw new Error('Incorrect email/password combination.')
      }

      console.log()

      const {secret, expiresIn} = authConfig.jwt;

      const token = sign({}, secret, {
         subject: user.id.toString(),
         expiresIn,
      });

      return {user, token}
   }
}