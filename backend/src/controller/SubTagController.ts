import { Tag } from '../model/Tag';
import { SubTag } from '../model/SubTag';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

export default class SubTagController {

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

    public async processCompleteData(req : Request): Promise<SubTag> {
        const subTag = new SubTag();
        const body = req["body"];
        subTag.tag = new Tag();

        subTag.id = body.id;
        subTag.tag.id = body.tag_id;
        subTag.description = body.description;

        return subTag;
    }

    public async processData(req : Request): Promise<SubTag> {
        const subTag = new SubTag();
        const body = req["body"];
        subTag.tag = new Tag();

        subTag.id = body.id;
        subTag.tag.id = body.tag_id;
        subTag.description = body.description;

        return subTag;
    }
}
