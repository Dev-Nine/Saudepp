import { Tag } from '../model/Tag';
import { Request, Response } from 'express';
import GenericController from './GenericController';

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

    public processCompleteData(req : Request): Tag | undefined {
        const tag = new Tag();
        const body = req["body"];

        tag.id = body.id;
        tag.description = body.description;

        if(tag.isValid())
            return tag;
        return undefined;
    }

    public processData(req : Request): Tag {
        const tag = new Tag();
        const body = req["body"];

        tag.id = body.id;
        tag.description = body.description;

        return tag;
    }
}