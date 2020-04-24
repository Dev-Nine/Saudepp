import { Tag } from '../model/Tag';
import { Request, Response } from 'express';
import GenericController from './GenericController';
import { validate } from 'class-validator';

export default class TagController extends GenericController<Tag> {
    constructor() {
        super(Tag);
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

    public async processCompleteData(req : Request): Promise<Tag | undefined> {
        const tag = new Tag();
        const body = req["body"];

        tag.id = body.id;
        tag.description = body.description;

        const errors = await validate(tag);
        if(errors.length > 0) {
          console.log(errors);
          return undefined
        }
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
