import { Tag } from '../model/Tag';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

export default class TagController {

    public async validateGet(req : Request): Promise<number>{ return 200 }

    // semelhante para edição e delete
    public async validateCreate(req : Request): Promise<number>{
        const userId = req.headers.authorization;

        if(userId == undefined)
            return 401;
        return 200;
    }

    public async validateEdit(req : Request): Promise<number>{
        return this.validateCreate(req);
    }

    public async validateDelete(req : Request): Promise<number>{
        return this.validateCreate(req);
    }

    public async processCompleteData(req : Request): Promise<Tag> {
        const tag = new Tag();
        const body = req["body"];

        tag.id = body.id;
        tag.description = body.description;

        return tag;
    }

    public async processData(req : Request): Promise<Tag> {
        const tag = new Tag();
        const body = req["body"];

        tag.id = body.id;
        tag.description = body.description;

        return tag;
    }
}
