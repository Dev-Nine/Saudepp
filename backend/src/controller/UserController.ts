import { User } from '../model/User';
import { Request, Response } from 'express';
import GenericController from './GenericController';

export default class UserController extends GenericController<User> {
    constructor() {
        super(User);
    }

    public validateGet(req : Request): number{ return 200 }

    public validateCreate(req : Request): number{ return 200 }

    public validateEdit(req : Request): number{ 
        const userId = req.headers.authorization;

        if(userId == undefined)
            return 401;
        return 200; 
    }

    public validateDelete(req : Request): number{ 
        return this.validateEdit(req);
     }

    public processCompleteData(req : Request): User | undefined {
        const user = new User;
        const body = req["body"];

        user.id = body.id;
        user.name = body.name;
        user.email = body.email;
        user.notices = body.notices;
        user.password = body.password;

        if (user.isValid()) 
            return user; 
        return undefined;
    }

    public processData(req : Request): User {
        const user = new User;
        const body = req["body"];

        user.id = body.id;
        user.name = body.name;
        user.email = body.email;
        user.notices = body.notices;
        user.password = body.password;

        return user; 
    }
}