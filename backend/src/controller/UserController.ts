import { User } from '../model/User';
import { Request, Response } from 'express';
import { Notice } from '../model/Notice';
import GenericController from './GenericController';

export default class UserController extends GenericController<User> {
    constructor() {
        super(User);
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

    public processData(req : Request): User | undefined {
        const user = new User;
        const body = req["body"];

        user.id = body.id;
        user.name = body.name;
        user.email = body.email;
        user.notices = body.notices;
        user.password = body.password;

        console.log(user);

        return user; 
    }
}