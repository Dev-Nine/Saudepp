import { Repository, getConnection, DeleteResult, ObjectID, ObjectType, QueryFailedError } from "typeorm";
import { Request, Response } from 'express';

export default class GenericController<T> {
    private repository: Repository<T>;
    private classType: ObjectType<T>

    constructor(classType: ObjectType<T>) {
        this.classType = classType;
        this.repository = getConnection().getRepository(this.classType);
    }

    public processCompleteData(req : Request): T | undefined {
        throw Error(`PROCESS COMPLETE DATA NOT IMPLEMENTED IN ${this.classType}`);
    }

    public processData(req : Request): T | undefined {
        throw Error(`PROCESS DATA NOT IMPLEMENTED IN ${this.classType}`);
    }

    public async getAll(req : Request, res : Response): Promise<Response> {
        const objects = await this.repository.find();
        return res.json(objects);
    }

    public async getByPk(req : Request, res : Response): Promise<Response> {
        const object: T = await this.repository.findOne(req.params["id"]);
        return res.json(object);
    }

    public async create(req : Request, res : Response): Promise<Response> {
        const object: T = this.processCompleteData(req);

        if (object) {
            const result: T[] = await this.repository.save([object]);
            return res.json(result);
        } 

        throw Error(`Error in the attributes from ${this.classType}`);
    }

    public async edit(req : Request, res : Response): Promise<Response> {
        try{
            const object: T = this.processData(req);

            if (object) {
                const foundObject = await this.repository.findOne(req.params["id"]);
                this.repository.merge(foundObject, object);
                const result = await this.repository.save(foundObject);
                return res.json(result);
            }
            throw Error(`Error in the attributes from ${this.classType}`);
        }catch(err){
            console.log(err.message);
        }
    }

    public async delete(req : Request, res : Response): Promise<Response> {
        const result: DeleteResult = await this.repository.delete(req.params["id"]);
        if(result.affected >= 1)
            return res.status(200).send();
        else
            return res.status(404).send();
    }

}