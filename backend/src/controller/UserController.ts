import { Repository, getConnection, DeleteResult, QueryFailedError } from "typeorm";
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../model/User';

import { Errors } from '../Errors';

// unused
//import { validate } from 'class-validator';
//import { resolveSoa } from "dns";

export default class UserController {
    private repository : Repository<User>;

    constructor(){
        this.repository = getConnection().getRepository(User);
    }

    public async validateCreate(req : Request): Promise<void>{
        // por enquanto isso é valido somente nessa fase de testes
        if(req.body.type == UserRole.ADMIN)
            return;

        if(req.user.type == UserRole.ADMIN)
            return;
        throw Errors.Forbidden;

        /* codigo abaixo quando tiver usuario comum
        
        // usuario adm nao pode ser criado por qualquer usuario
        // usuario "mod" nao é criado diretamente, é transformado de um usuario existente
        // if(req.body.type == UserRole.ADMIN || req.body.type == UserRole.MODERADOR)
        //     return 403;

        // permissoes de usuario nao autenticado
        if(!req.user){
            // if(req.body.type == UserRole.COMUM)
            //     return 200;
            throw Errors.Forbidden;
        }

        // somente usuario adm pode criar profissionais
        if(req.user.type != UserRole.ADMIN && req.body.type == UserRole.PROFISSIONAL)
            throw Errors.Forbidden;

        return 200;
        */
    }

    public async validateEdit(req : Request): Promise<void>{
        const editedUser : User = await this.repository.findOne(req.params.id);

        // o proprio usuario pode alterar sua conta, entrentanto:
        // nao pode alterar o seu tipo
        if(req.user.id == req.params.id){
            if(req.body.type && req.body.type != req.user.type)
                throw Errors.Forbidden;
            return;
        }

        // jamais editar um usuario para se tornar adm
        if(req.body.type == UserRole.ADMIN)
            throw Errors.Forbidden;

        // se for um usuario adm logado
	if(req.body.type) {
	    if(req.user.type == UserRole.ADMIN){
		// profissional nao é editado, mas sim criado
		if(req.body.type == UserRole.PROFISSIONAL || editedUser.type == UserRole.PROFISSIONAL)
		    throw Errors.Forbidden;
		// else if(editedUser.type == UserRole.MODERADOR || editedUser.type == UserRole.COMUM)
		//     return 200;
	    }
	}
            
        throw Errors.Forbidden;
    }

    public async validateDelete(req : Request): Promise<void>{
        const deletedUser : User = await this.repository.findOne(req.params.id);

        // o proprio usuario pode excluir sua conta
        if(req.user.id == req.params.id)
            return;

        // adm pode excluir a conta de qualquer um
        // exceto outros adms lol
        if(req.user.type == UserRole.ADMIN && deletedUser.type != UserRole.ADMIN)
            return;

        throw Errors.Forbidden;
    }

    public async processCreateData(req : Request): Promise<User> {
        const user = new User;
        const body = req["body"];

        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
        user.username = body.username;
        user.identifier = body.identifier;
        user.identifierType = body.identifierType;

        if(body.type >= 0 && body.type <= 3)
            user.type = body.type;

        return user;
    }

    public async processEditData(req : Request): Promise<User> {
        const user = new User;
        const body = req["body"];

        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
        user.username = body.username;
        user.identifier = body.identifier;
        user.identifierType = body.identifierType;

        if(body.type >= 0 && body.type <= 3)
            user.type = body.type;

        return user;
    }

    public async getAll(req : Request, res : Response, next) : Promise<Response> {
        const users = await this.repository.find();
        if(users && users.length > 0)
            return res.json(users);
        
        return next(new Errors.NotFound);
    }

    public async getByPk(req : Request, res : Response, next) : Promise<Response> {
        const user = await this.repository.findOne(req.params["id"]);
        if(user)
            return res.json(user);
        
	return next(new Errors.NotFound);
    }

    public async create(req : Request, res : Response, next: Function) : Promise<Response>{
        try{           
	    await this.validateCreate(req);

            req["body"].password = await bcrypt.hash(req["body"].password, 8);

            const user: User = await this.processCreateData(req);

            //const errors = await this.validateData(user);
            //if (errors)
            //    return res.status(400).send({ error: errors });

            const result: User[] = await this.repository.save([user]);
            delete result[0].id;
            delete result[0].password;
            return res.json(result);

        }catch(err){	
	    return next(err);
            //return res.status(400).send();
	}
    }

    public async edit(req : Request, res : Response, next): Promise<Response> {
        try{
            await this.validateEdit(req);
            
	    if(req["body"].password !== undefined)
                req["body"].password = await bcrypt.hash(req["body"].password, 8);

            const user: User = await this.processEditData(req);

            //const errors = await validate(user);
            //if (errors)
            //    return res.status(400).json({ error: errors})

            const foundUser = await this.repository.findOne(req.params["id"]);
            this.repository.merge(foundUser, user);

            const result = await this.repository.save(foundUser);
            delete result.id;
            delete result.password;

            return res.json(result);
        }catch(err){
            return next(err);
	}
    }

    public async delete(req : Request, res : Response, next): Promise<Response> {
        try{
            await this.validateDelete(req);
            
	    const result: DeleteResult = await this.repository.delete(req.params["id"]);
            if(result.affected >= 1)
                return res.status(200).send();
            else
                throw Errors.NotFound;
        }catch(err){
            return next(err);
	}
    }
}
