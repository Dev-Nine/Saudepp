import { Repository, getConnection, DeleteResult, ObjectID, ObjectType, QueryFailedError } from "typeorm";
import { Request, Response } from 'express';

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
        console.log(err);
        console.log(err.constructor.name);
        console.log(err.message);
        if(err instanceof QueryFailedError)
            return res.status(400).send( { error: 'Query error, authorization may be invalid' } );
        return res.status(500).send();
    }


    public processCompleteData(req : Request): T | undefined {
        throw Error(`PROCESS COMPLETE DATA NOT IMPLEMENTED IN ${this.classType}`);
    }

    public processData(req : Request): T {
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

            const object: T = this.processCompleteData(req);

            if (object) {
                const result: T[] = await this.repository.save([object]);
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

            const object: T = this.processData(req);

            if (object) {
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