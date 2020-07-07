import { Repository, getConnection, DeleteResult } from "typeorm";
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../model/User';

import { Forbidden, NotFound } from '../Errors';

// unused
//import { validate } from 'class-validator';
//import { resolveSoa } from "dns";

export default class UserController {
    private repository : Repository<User>;

    constructor(){
        this.repository = getConnection().getRepository(User);
    }

    public async validateCreate(req : Request): Promise<void>{
        // if (!req.body.password || !(req.body.password.length >= 6))
        //     throw Error('Password length must be 6 or more characters');

        // por enquanto isso é valido somente nessa fase de testes
        if(req.body.type == UserRole.ADMIN)
            return;

        throw Forbidden;

        /* codigo abaixo quando tiver usuario comum
        
        // usuario adm nao pode ser criado por qualquer usuario
        // usuario "mod" nao é criado diretamente, é transformado de um usuario existente
        // if(req.body.type == UserRole.ADMIN || req.body.type == UserRole.MODERADOR)
        //     return 403;

        // permissoes de usuario nao autenticado
        if(!req.user){
            // if(req.body.type == UserRole.COMUM)
            //     return 200;
            throw Forbidden;
        }

        // somente usuario adm pode criar profissionais
        if(req.user.type != UserRole.ADMIN && req.body.type == UserRole.PROFISSIONAL)
            throw Forbidden;

        return 200;
        */
    }

    public async validateEdit(req : Request): Promise<void>{
        const editedUser : User = await this.repository.findOne(req.params.id);

        // o proprio usuario pode alterar sua conta, entrentanto:
        // nao pode alterar o seu tipo
        if(req.user.id == req.params.id){
            if(req.body.type && req.body.type != req.user.type)
                throw Forbidden;
            return;
        }

        // jamais editar um usuario para se tornar adm
        if(req.body.type == UserRole.ADMIN)
            throw Forbidden;

        // se for um usuario adm logado
        if(req.body.type) {
            if(req.user.type == UserRole.ADMIN){
                // profissional nao é editado, mas sim criado
                if(req.body.type == UserRole.PROFISSIONAL || editedUser.type == UserRole.PROFISSIONAL)
                    throw Forbidden;
                // else if(editedUser.type == UserRole.MODERADOR || editedUser.type == UserRole.COMUM)
                //     return 200;
            }
        }
            
        throw Forbidden;
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

        throw Forbidden;
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
        user.type = body.type;

        return user;
    }

    public async getAll(req : Request, res : Response, next) : Promise<Response> {
        const users = await this.repository.find();
        if(users && users.length > 0)
            return res.json(users);
        
        return next(new NotFound);
    }

    public async getByPk(req : Request, res : Response, next) : Promise<Response> {
        const user = await this.repository.findOne(req.params["id"], {
            select: [
                "id", 
                "name", 
                "email", 
                "username", 
                "type",
                "identifierType",
                "identifier"
            ]});
        if(user){
            if(!req.user || (req.user.type != 0 && parseInt(req.user.id) != user.id)){
                delete user.email;
                delete user.username;
                delete user.identifier;
                delete user.identifierType;
            }
            return res.json(user);
        }
            
        
	    return next(new NotFound);
    }

    public async create(req : Request, res : Response, next: Function) : Promise<Response>{
        try{           
        await this.validateCreate(req);

            req["body"].password = await bcrypt.hash(req["body"].password, 8);

            const user: User = await this.processCreateData(req);

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

            const foundUser = await this.repository.findOne(
            req.params["id"], {
            select: [
                "id", 
                "name", 
                "email", 
                "username", 
                "password", 
            ]});
			
			if (foundUser) {
				this.repository.merge(foundUser, user);

				const result = await this.repository.save(foundUser);
				delete result.id;
				delete result.password;

				return res.json(result);
			}
			throw new NotFound;
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
                throw NotFound;
        }catch(err){
            return next(err);
	}
    }
}
