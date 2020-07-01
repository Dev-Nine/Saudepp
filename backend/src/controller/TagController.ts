import { Repository, getConnection, DeleteResult } from "typeorm";
import { Request, Response } from 'express';
import { Tag } from '../model/Tag';
import { UserRole } from '../model/User';

import { NotFound } from '../Errors';

export default class TagController {
    private repository : Repository<Tag>;

    constructor(){
        this.repository = getConnection().getRepository(Tag);
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
        if(req.user.type == UserRole.ADMIN /* || req.user.type == UserRole.MODERADOR*/)
            return 200;
        return 403;
    }

    public async validateDelete(req : Request): Promise<number>{
        return this.validateEdit(req);
    }

    public async processCreateData(req : Request): Promise<Tag> {
        const tag = new Tag();
        const body = req["body"];

        tag.title = body.title;
        tag.description = body.description;

        return tag;
    }

    public async processEditData(req : Request): Promise<Tag> {
        const tag = new Tag();
        const body = req["body"];

        tag.title = body.title;
        tag.description = body.description;

        return tag;
    }

    public async getAll(req : Request, res : Response, next) : Promise<Response> {
        const tags = await this.repository.find();
        if(tags && tags.length > 0)
            return res.json(tags);
        
        const err = new NotFound;
	return next(err);
    }

    public async getByPk(req : Request, res : Response, next) : Promise<Response> {
        const tag = await this.repository.findOne(req.params["id"]);
        if(tag)
            return res.json(tag);
        
	const err = new NotFound;
	return next(err);
    }

    public async create(req : Request, res : Response, next) : Promise<Response>{
        try{
            const statusCode = await this.validateCreate(req);

            if(statusCode != 200)
                return res.status(statusCode).send();

            const tag: Tag = await this.processCreateData(req);

            const result: Tag[] = await this.repository.save([tag]);
            return res.json(result);
        }catch(err){
            return next(err);
        }
    }

    public async edit(req : Request, res : Response, next): Promise<Response> {
        try{
            const statusCode = await this.validateEdit(req);
            if(statusCode != 200)
                return res.status(statusCode).send();

            const tag: Tag = await this.processEditData(req);

            const foundTag = await this.repository.findOne(req.params["id"]);
            if(foundTag){
                
                this.repository.merge(foundTag, tag);

                const result = await this.repository.save(foundTag);

                return res.json(result);
            }
            throw new NotFound;
        }catch(err){
            return next(err);
        }
    }

    public async delete(req : Request, res : Response, next): Promise<Response> {
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
	    return next(err);
        }
    }
}
