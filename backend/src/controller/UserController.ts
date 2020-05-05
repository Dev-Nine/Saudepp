import { Repository, getConnection, DeleteResult } from "typeorm";
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User } from '../model/User';

// unused
//import { validate } from 'class-validator';
//import { resolveSoa } from "dns";

export default class UserController {
    private repository : Repository<User>;

    constructor(){
        this.repository = getConnection().getRepository(User);
    }

    public async validateCreate(req : Request): Promise<number>{
        // por enquanto isso é valido somente nessa fase de testes
        if(req.body.type == 0)
            return 200;
        
        // usuario adm nao pode ser criado por qualquer usuario
        // usuario "mod" nao é criado diretamente, é transformado de um usuario existente
        if(req.body.type == 0 || req.body.type == 1)
            return 403;

        // permissoes de usuario nao autenticado
        if(!req.user){
            if(req.body.type == 3)
                return 200;
            return 403;
        }

        // somente usuario adm pode criar profissionais
        if(req.user.type != 0 && req.body.type == 2)
            return 403;

        return 200;
    }

    public async validateEdit(req : Request): Promise<number>{
        const editedUser : User = await this.repository.findOne(req.params.id);

        // o proprio usuario pode alterar sua conta, entrentanto:
        // nao pode alterar o seu tipo
        if(req.user.id == req.params.id){
            if(req.body.type && req.body.type != req.user.type)
                return 403;
            return 200;
        }

        // jamais editar um usuario para se tornar adm
        if(req.body.type == 0)
            return 403;

        // se for um usuario adm logado
        if(req.user.type == 0){
            // profissional nao é editado, mas sim criado
            if(req.body.type == 2 || editedUser.type == 2)
                return 403;
            else if(editedUser.type == 1 || editedUser.type == 3)
                return 200;
        }
            
        return 403;
    }

    public async validateDelete(req : Request): Promise<number>{
        const deletedUser : User = await this.repository.findOne(req.params.id);

        // o proprio usuario pode excluir sua conta
        if(req.user.id == req.params.id)
            return 200;

        // adm pode excluir a conta de qualquer um
        // exceto outros adms lol
        if(req.user.type == 0 && deletedUser.type != 0)
            return 200;

        return 403;
    }

    public async processCreateData(req : Request): Promise<User> {
        const user = new User;
        const body = req["body"];

        user.name = body.name;
        user.email = body.email;
        user.password = body.password;

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

        if(body.type >= 0 && body.type <= 3)
            user.type = body.type;

        return user;
    }

    public async getAll(req : Request, res : Response) : Promise<Response> {
        const users = await this.repository.find();
        if(users && users.length > 0)
            return res.json(users);
        else
            return res.status(404).send( { error: 'Not found'} );
    }

    public async getByPk(req : Request, res : Response) : Promise<Response> {
        const user = await this.repository.findOne(req.params["id"]);
        if(user)
            return res.json(user);
        else
            return res.status(404).send( { error: 'Not found'} );
    }

    public async create(req : Request, res : Response) : Promise<Response>{
        try{
            const statusCode = await this.validateCreate(req);

            if(statusCode != 200){
                console.log("a");
                return res.status(statusCode).send();
            }

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
            if(err instanceof Error){
                console.log(err.stack);
                console.log(err.message);
            }
            return res.status(400).send();
        }
    }

    public async edit(req : Request, res : Response): Promise<Response> {
        try{
            const statusCode = await this.validateEdit(req);
            if(statusCode != 200)
                return res.status(statusCode).send();

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
            if(err instanceof Error){
                console.log(err.stack);
                console.log(err.message);
            }
            return res.status(400).send();
        }
    }

    public async delete(req : Request, res : Response): Promise<Response> {
        try{
            const statusCode = await this.validateDelete(req);
            if(statusCode != 200)
                return res.status(statusCode).send();

            const result: DeleteResult = await this.repository.delete(req.params["id"]);
            if(result.affected >= 1)
                return res.status(200).send();
            else
                return res.status(404).send();
        }catch(err){
            if(err instanceof Error){
                console.log(err.stack);
                console.log(err.message);
            }
            return res.status(400).send();
        }
    }
}
