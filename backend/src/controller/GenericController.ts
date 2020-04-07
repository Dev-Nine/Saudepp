import { Repository, getConnection, DeleteResult, ObjectID, ObjectType } from "typeorm";
import { Request } from 'express';

export default class UserController<T> {
    private repository: Repository<T>;
    private classType: ObjectType<T>

    constructor(classType: ObjectType<T>) {
        this.classType = classType;
        this.repository = getConnection().getRepository(this.classType);
    }

    public processBody(body : Request["body"]): T | undefined {
        throw Error(`PROCESS BODY NOT IMPLEMENTED IN ${this.classType}`);
    }

    public async getAll(): Promise<T[]> {
        return this.repository.find();
    }

    public async getByPk(id : number | string | ObjectID): Promise<T> {
        return this.repository.findOne(id);
    }

    public async create(body : Request["body"]): Promise<T[]> {
        const object: T = this.processBody(body);

        if (object) {
            return this.repository.save([object]);
        } 
        throw Error(`Error in the attributes from ${this.classType}`);
    }

    public async edit(body : Request["body"], id : number | string | ObjectID): Promise<T> {
        const object: T = this.processBody(body);

        if (object) {
            const user = await this.repository.findOne(id);
            this.repository.merge(user, object);
            return this.repository.save(user);
        }
        throw Error(`Error in the attributes from ${this.classType}`);
    }

    public async delete(id : number | string | ObjectID): Promise<DeleteResult> {
        return this.repository.delete(id);
    }

}