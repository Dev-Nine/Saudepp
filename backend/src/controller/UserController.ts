import { Request, Response } from 'express';
import { validate } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { User } from '../model/User';
import GenericController from './GenericController';

export default class UserController extends GenericController<User> {
    constructor() {
        super(User);
    }

    // perfis de usuarios vao poder ser acessados por pessoas sem conta
    // cuidado para nao retornar o email do individuo
    public async validateGet(req : Request): Promise<number>{ return 200 }

    public async validateCreate(req : Request): Promise<number>{
        const { type } : User = await this.repository.findOne(req.user.id);

        // por enquanto isso é valido somente nessa fase de testes
        if(req.body.type == 0)
            return 200;

        // usuario adm nao pode ser criado por qualquer usuario
        // usuario "mod" nao é criado diretamente, é transformado de um usuario existente
        if(req.body.type == 0 || req.body.type == 1)
            return 403;

        // somente usuario adm pode criar profissionais
        if(type != 0 && req.body.type == 2)
            return 403;

        return 200;
    }

    public async validateEdit(req : Request): Promise<number>{
        const loggedUser : User = await this.repository.findOne(req.user.id);
        const editedUser : User = await this.repository.findOne(req.params.id);

        // o proprio usuario pode alterar sua conta, entrentanto:
        // nao pode alterar o seu tipo
        if(req.user.id == req.params.id){
            if(req.body.type && req.body.type != loggedUser.type)
                return 403;
            return 200;
        }

        // jamais editar um usuario para se tornar adm
        if(req.body.type == 0)
            return 403;

        // se for um usuario adm logado
        if(loggedUser.type == 0){
            // profissional nao é editado, mas sim criado
            if(req.body.type == 2 || editedUser.type == 2)
                return 403;
            else if(editedUser.type == 1 || editedUser.type == 3)
                return 200;
        }
            
        return 403;
    }

    public async validateDelete(req : Request): Promise<number>{
        const loggedUser : User = await this.repository.findOne(req.user.id);
        const editedUser : User = await this.repository.findOne(req.params.id);

        // o proprio usuario pode excluir sua conta
        if(req.user.id == req.params.id)
            return 200;

        // adm pode excluir a conta de qualquer um
        // exceto outros adms lol
        if(loggedUser.type == 0 && editedUser.type != 0)
            return 200;

        return 403;
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
