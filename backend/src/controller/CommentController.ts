import { Request, Response } from 'express';
import { Comment } from '../model/Comment';
import GenericController from './GenericController';
import { User } from '../model/User';
import { Notice } from '../model/Notice';

export default class CommentController extends GenericController<Comment> {
    constructor() {
        super(Comment);
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

    public processCompleteData(req : Request): Comment | undefined {
        const comment = new Comment();
        comment.author = new User();
        comment.notice = new Notice();
        const body = req["body"];


        comment.author.id = parseInt(req.headers.authorization);
        comment.notice.id = parseInt(req.headers.notice.toString());

        comment.content = body.content;

        if(comment.isValid())
            return comment;
        return undefined;
    }

    public processData(req : Request): Comment {
        const comment = new Comment();
        comment.author = new User();
        comment.notice = new Notice();
        const body = req["body"];

        comment.author.id = parseInt(req.headers.authorization);
        comment.notice.id = body.notice_id;
        comment.content = body.content;

        return comment;
    }
}
