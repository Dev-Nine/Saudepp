import { User } from '../model/User';
import { Request, Response } from 'express';
import GenericController from './GenericController';
import * as bcrypt from 'bcryptjs';

export default class UserController extends GenericController<User> {
    constructor() {
        super(User);
    }

    public validateGet(req : Request): number{ return 200 }

    public validateCreate(req : Request): number{ return 200 }

    public validateEdit(req : Request): number{ 

        // deprecated: começar a usar o token de autenticacao
        //const userId = req.headers.authorization;

        //if(userId == undefined)
        //    return 401;
        console.log(req.user.id);
        return 200; 
    }

    public validateDelete(req : Request): number{ 
        //return this.validateEdit(req);
        return 200;
     }

    public processCompleteData(req : Request): User | undefined {
        const user = new User;
        const body = req["body"];

        user.id = body.id;
        user.name = body.name;
        user.email = body.email;
        user.notices = body.notices;
        user.password = body.password;
        user.type = body.type;

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

        // garantia
        if(body.type >= 0 && body.type <= 3)
            user.type = body.type;

        return user; 
    }

    public async create(req : Request, res : Response) : Promise<Response>{
        try{
            const statusCode = this.validateCreate(req);

            if(statusCode != 200)
                return res.status(statusCode).send();

            req["body"].password = await bcrypt.hash(req["body"].password, 8);

            const user: User = this.processCompleteData(req);

            if (user) {
                const result: User[] = await this.repository.save([user]);
                delete result[0].id;
                delete result[0].password;
                return res.json(result);
            } 

            throw Error(`Error in the attributes from ${this.classType}`);
        }catch(err){
            return this.validateError(err, res);
        }
    }

    public async edit(req : Request, res : Response): Promise<Response> {
        try{
            const statusCode = this.validateEdit(req);
            if(statusCode != 200)
                return res.status(statusCode).send();

            req["body"].password = await bcrypt.hash(req["body"].password, 8);

            const user: User = this.processData(req);

            if (user) {
                const foundUser = await this.repository.findOne(req.params["id"]);
                this.repository.merge(foundUser, user);
                const result = await this.repository.save(foundUser);
                return res.json(result);
            }
            throw Error(`Error in the attributes from ${this.classType}`);
        }catch(err){
            return this.validateError(err, res);
        }
    }
}