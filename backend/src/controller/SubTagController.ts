import { Tag } from '../model/Tag';
import { SubTag } from '../model/SubTag';
import { Request, Response } from 'express';
import { validate } from 'class-validator';
import GenericController from './GenericController';

export default class SubTagController extends GenericController<SubTag> {
    constructor() {
        super(SubTag);
    }

    public validateGet(req : Request): number{ return 200 }

    // semelhante para edição e delete
    public validateCreate(req : Request): number{
        const userId = req.headers.authorization;

        if(userId == undefined)
            return 401;
        return 200;
    }

    public validateEdit(req : Request): number{
        return this.validateCreate(req);
    }

    public validateDelete(req : Request): number{
        return this.validateCreate(req);
    }

    public async processCompleteData(req : Request): Promise<SubTag | undefined> {
        const subTag = new SubTag();
        const body = req["body"];
        subTag.tag = new Tag();

        subTag.id = body.id;
        subTag.tag.id = body.tag_id;
        subTag.description = body.description;

        const errors = await validate(subTag);
        if(errors.length > 0) {
          console.log(errors);
          return undefined;
        }
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
