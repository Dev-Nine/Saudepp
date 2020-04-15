import { Tag } from '../model/Tag';
import { SubTag } from '../model/SubTag';
import { Request, Response } from 'express';
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

    public processCompleteData(req : Request): SubTag | undefined {
        const subTag = new SubTag();
        const body = req["body"];
        subTag.tag = new Tag();

        subTag.id = body.id;
        subTag.tag.id = body.tag_id;
        subTag.description = body.description;

        if(subTag.isValid())
            return subTag;
        return undefined;
    }

    public processData(req : Request): SubTag {
        const subTag = new SubTag();
        const body = req["body"];
        subTag.tag = new Tag();

        subTag.id = body.id;
        subTag.tag.id = body.tag_id;
        subTag.description = body.description;

        return subTag;
    }
}