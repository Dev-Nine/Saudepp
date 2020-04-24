import { Notice } from '../model/Notice';
import { Request, Response } from 'express';
import GenericController from './GenericController';
import { validate } from 'class-validator';
import { User } from '../model/User';
import { Tag } from '../model/Tag';

export default class NoticeController extends GenericController<Notice> {
    constructor() {
        super(Notice);
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

    public async processCompleteData(req : Request): Promise<Notice | undefined> {
        const notice = new Notice();
        notice.user = new User();
        const body = req["body"];

        notice.tags = [];
        if(body.tags === undefined)
            return undefined;

        for (const tagAttr of body.tags){
            let tag = new Tag();
            tag.id = tagAttr.id;
            notice.tags.push(tag);
        }

        notice.id = body.id;
        notice.title = body.title;
        notice.text = body.text;
        notice.user.id = parseInt(req.headers.authorization);
        notice.abstract = body.abstract;

        const errors = await validate(notice);
        if(errors.length > 0)
            return notice;
        return undefined;
    }

    public async processData(req : Request): Promise<Notice> {
        const notice = new Notice();
        notice.user = new User();
        const body = req["body"];

        if(body.tags !== undefined){
            notice.tags = [];
            for (const tagAttr of body.tags){
                let tag = new Tag();
                tag.id = tagAttr.id;
                notice.tags.push(tag);
            }
        }

        notice.id = body.id;
        notice.title = body.title;
        notice.text = body.text;
        notice.user.id = parseInt(req.headers.authorization);
        notice.abstract = body.abstract;

        return notice;
    }
}
