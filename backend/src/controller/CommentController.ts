import { Comment } from '../model/Comment';
import { Request, Response } from 'express';
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
        comment.notice.id = parseInt(req.header('Notice-ID'));
        comment.content = body.content;
        comment.date = new Date();

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
        comment.notice.id = parseInt(req.header('Notice-ID'));
        comment.content = body.content;
        comment.date = new Date();

        return comment;
    }
}