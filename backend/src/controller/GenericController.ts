import { Repository, getConnection, DeleteResult, ObjectID, ObjectType, QueryFailedError } from "typeorm";
import { Request, Response } from 'express';
import { validate } from 'class-validator';

export default abstract class GenericController<T> {
    protected repository: Repository<T>;
    protected classType: ObjectType<T>

    constructor(classType: ObjectType<T>) {
        this.classType = classType;
        this.repository = getConnection().getRepository(this.classType);
    }

    public abstract validateGet(req : Request) : number;
    public abstract validateCreate(req : Request) : number;
    public abstract validateEdit(req : Request) : number;
    public abstract validateDelete(req : Request) : number;

    protected validateError(err : Error, res : Response): Response{
        console.log(err.stack);
        console.log(err.name);
        console.log(err.message);
        if(err instanceof QueryFailedError){
            var errCode = err["code"];
            console.log("Error code " + errCode);
        }
        return res.status(500).send({ name: err.name, message: err.message });
    }


    public async processCompleteData(req : Request): Promise<T> {
        throw Error(`PROCESS COMPLETE DATA NOT IMPLEMENTED IN ${this.classType}`);
    }

    public async processData(req : Request): Promise<T> {
        throw Error(`PROCESS DATA NOT IMPLEMENTED IN ${this.classType}`);
    }

    public async getAll(req : Request, res : Response): Promise<Response> {
        const objects = await this.repository.find();
        if(objects)
            return res.json(objects);
        else
            return res.status(404).send( { error: 'Not found'} )
    }

    public async getByPk(req : Request, res : Response): Promise<Response> {
        const object: T = await this.repository.findOne(req.params["id"]);
        if(object)
            return res.json(object);
        else
            return res.status(404).send( { error: 'Not found'} )
    }

    public async create(req : Request, res : Response): Promise<Response> {
        try{
            const statusCode = this.validateCreate(req);
            if(statusCode != 200)
                return res.status(statusCode).send();

            //Processa a data do objeto
            const object: T = await this.processCompleteData(req);

            //Verifica se existe erros utilizando o class-validator
            const errors = await validate(object);
            console.log(errors);
            if (errors.length === 0) {
                const result: T[] = await this.repository.save([object]);
                return res.json(result);

                throw Error(`Error in the attributes from ${this.classType}`);
            } else {
                return res.json({
                    error: 'Um erro ocorreu!'
                });
            }

        }catch(err){
            return this.validateError(err, res);
        }
    }

    public async edit(req : Request, res : Response): Promise<Response> {
        try{
            const statusCode = this.validateEdit(req);
            if(statusCode != 200)
                return res.status(statusCode).send();

            const object: T = await this.processData(req);
            const errors = await validate(object);
            if (errors.length === 0) {
                const foundObject = await this.repository.findOne(req.params["id"]);
                this.repository.merge(foundObject, object);
                const result = await this.repository.save(foundObject);
                return res.json(result);
            }
            throw Error(`Error in the attributes from ${this.classType}`);
        }catch(err){
            return this.validateError(err, res);
        }
    }

    public async delete(req : Request, res : Response): Promise<Response> {
        try{
            const statusCode = this.validateCreate(req);

            if(statusCode != 200)
                return res.status(statusCode).send();

            const result: DeleteResult = await this.repository.delete(req.params["id"]);
            if(result.affected >= 1)
                return res.status(200).send();
            else
                return res.status(404).send();
        }catch(err){
            return this.validateError(err, res);
        }
    }

}
