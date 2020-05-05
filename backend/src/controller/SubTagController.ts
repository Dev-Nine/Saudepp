import { Repository, getConnection, DeleteResult } from "typeorm";
import { Tag } from '../model/Tag';
import { SubTag } from '../model/SubTag';
import { Request, Response } from 'express';
import { UserRole } from '../model/User';
import { validate } from 'class-validator';

export default class SubTagController {
    private repository : Repository<SubTag>;

    constructor(){
        this.repository = getConnection().getRepository(SubTag);
    }

    // semelhante para edição e delete
    public async validateCreate(req : Request): Promise<number>{
        // somente usuario adm e profissional pode criar tag
        if(req.user.type == UserRole.ADMIN || req.user.type == UserRole.PROFISSIONAL)
            return 200;
        return 403;
    }

    public async validateEdit(req : Request): Promise<number>{
        // somente usuario adm ou moderador pode alterar
        if(req.user.type == UserRole.ADMIN || req.user.type == UserRole.MODERADOR)
            return 200;
        return 403;
    }

    public async validateDelete(req : Request): Promise<number>{
        return this.validateEdit(req);
    }

    public async processCreateData(req : Request): Promise<SubTag> {
        const subTag = new SubTag();
        const body = req["body"];
        subTag.tag = new Tag();

        subTag.id = body.id;
        subTag.tag.id = body.tag_id;
        subTag.description = body.description;

        return subTag;
    }

    public async processEditData(req : Request): Promise<SubTag> {
        const subTag = new SubTag();
        const body = req["body"];
        subTag.tag = new Tag();

        subTag.id = body.id;
        subTag.tag.id = body.tag_id;
        subTag.description = body.description;

        return subTag;
    }

    public async getAll(req : Request, res : Response) : Promise<Response> {
        const subtags = await this.repository.find();
        if(subtags && subtags.length > 0)
            return res.json(subtags);
        else
            return res.status(404).send( { error: 'Not found'} );
    }

    public async getByPk(req : Request, res : Response) : Promise<Response> {
        const subtag = await this.repository.findOne(req.params["id"]);
        if(subtag)
            return res.json(subtag);
        else
            return res.status(404).send( { error: 'Not found'} );
    }

    public async create(req : Request, res : Response) : Promise<Response>{
        try{
            const statusCode = await this.validateCreate(req);

            if(statusCode != 200)
                return res.status(statusCode).send();

            const subtag: SubTag = await this.processCreateData(req);

            const result: SubTag[] = await this.repository.save([subtag]);
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

            const subtag: SubTag = await this.processEditData(req);

            const foundSubTag = await this.repository.findOne(req.params["id"]);
            this.repository.merge(foundSubTag, subtag);

            const result = await this.repository.save(foundSubTag);

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
