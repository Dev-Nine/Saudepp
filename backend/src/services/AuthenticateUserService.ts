import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import { User } from '../model/User';

interface Request {
   email: string;
   username: string;
   password: string;
}

interface Response {
   user: User;
   token: string;
}

export default class AuthenticateUserService {
   public async execute({email, username, password}: Request): Promise<Response> {
      // const queryBuilder = getRepository(User).createQueryBuilder();

      // const teste = await queryBuilder.select("user.email", email)
      //    .addSelect("user.password")
      //    .getOne();

      // console.log(teste);

      const userRepository = getRepository(User);
      var user : User;
      if(email){
         user = await userRepository.findOne({select: ["id", "name", "email", "username", "type",
         "registerType", "register", "registerState", "password", "imageId", "imageType"], where: {email}});
      }else{
         user = await userRepository.findOne({select: ["id", "name", "email", "username", "type",
         "registerType", "register", "registerState", "password", "imageId", "imageType"], where: {username}});
      }

      if (!user) {
         throw new Error('Incorrect combination.')
      }

      //console.log("Given: " + password, user.password);
      //console.log(user);
      const passwordMatched = await bcrypt.compare(password, user.password);
      
      if (!passwordMatched) {
         throw new Error('Incorrect combination.')
      }

      const {secret, expiresIn} = authConfig.jwt;

      const token = jwt.sign({}, secret, {
         subject: user.id.toString(),
         expiresIn,
      });

      return {user, token}
   }
}