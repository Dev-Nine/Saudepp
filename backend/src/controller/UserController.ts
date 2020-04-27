import { Request, Response } from 'express';
import { validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { User } from '../model/User';
import GenericController from './GenericController';

export default class UserController extends GenericController<User> {
    constructor() {
        super(User);
    }

    public async validateGet(req : Request): Promise<number>{ return 200 }

    public async validateCreate(req : Request): Promise<number>{ return 200 }

    public async validateEdit(req : Request): Promise<number>{
        if(req.user.id == req.params.id)
            return 200;
        return 403;
    }

    public async validateDelete(req : Request): Promise<number>{
        return this.validateEdit(req);
     }

    public async processCompleteData(req : Request): Promise<User> {
        const user = new User;
        const body = req["body"];

        user.id = body.id;
        user.name = body.name;
        user.email = body.email;
        user.notices = body.notices;
        user.password = body.password;
        user.type = body.type;

        return user;
    }

    public async processData(req : Request): Promise<User> {
        const user = new User;
        const body = req["body"];

        user.id = body.id;
        user.name = body.name;
        user.email = body.email;
        user.notices = body.notices;
        user.password = body.password;

        // garantia
        if(body.type >= 0 && body.type <= 3)
            user.type = body.type;

        return user;
    }

    public async create(req : Request, res : Response) : Promise<Response>{
        try{
            const statusCode = await this.validateCreate(req);

            if(statusCode != 200)
                return res.status(statusCode).send();

            req["body"].password = await bcrypt.hash(req["body"].password, 8);

            const user: User = await this.processCompleteData(req);

            const errors = await this.validateData(user);
            if (errors)
                return res.status(400).send({ error: errors });

            const result: User[] = await this.repository.save([user]);
            delete result[0].id;
            delete result[0].password;
            return res.json(result);

        }catch(err){
            return this.validateError(err, res);
        }
    }

    public async edit(req : Request, res : Response): Promise<Response> {
        try{
            const statusCode = await this.validateEdit(req);
            if(statusCode != 200)
                return res.status(statusCode).send();

            if(req["body"].password !== undefined)
                req["body"].password = await bcrypt.hash(req["body"].password, 8);

            const user: User = await this.processData(req);

            const errors = await validate(user);
            if (errors)
                return res.status(400).json({ error: errors})

            const foundUser = await this.repository.findOne(req.params["id"]);
            this.repository.merge(foundUser, user);

            const result = await this.repository.save(foundUser);
            delete result.id;
            delete result.password;

            return res.json(result);
        }catch(err){
            return this.validateError(err, res);
        }
    }
}
