import { Repository, getConnection, DeleteResult } from "typeorm";
import { Request, Response } from 'express';
import { Comment } from '../model/Comment';
import { User, UserRole } from '../model/User';
import { Notice } from '../model/Notice';
import { validate } from 'class-validator';

import NotFound from '../errors/NotFound';

export default class CommentController {
    private repository : Repository<Comment>;

    constructor(){
        this.repository = getConnection().getRepository(Comment);
    }

    // qualquer um pode realizar um comentario
    public async validateCreate(req : Request): Promise<number>{ return 200 }

    public async validateEdit(req : Request): Promise<number>{
        // somente o proprio usuario pode alterar seu comentario
        const editedComment : Comment = await this.repository.findOne(req.params["id"]);
        if(parseInt(req.user.id) == editedComment.user.id)
            return 200;

        return 403;
    }

    public async validateDelete(req : Request): Promise<number>{
        // adm e mod pode excluir qualquer comentario
        if(req.user.type == UserRole.ADMIN /*|| req.user.type == UserRole.MODERADOR*/)
            return 200;

        const editedComment : Comment = await this.repository.findOne(req.params["id"]);
        if(parseInt(req.user.id) == editedComment.user.id)
            return 200;

        return 403;
    }

    public async getAll(req : Request, res : Response, next) : Promise<Response> {
        const comments = await this.repository.find();
        if(comments && comments.length > 0)
            return res.json(comments);
        
	const err = new notfound;
        return next(err);
    }

    public async getByPk(req : Request, res : Response, next) : Promise<Response> {
        const comment = await this.repository.findOne(req.params["id"]);
        if(comment)
            return res.json(comment);
	
	const err = new notfound;
        return next(err);
    }

    public async processCreateData(req : Request): Promise<Comment> {
        const comment = new Comment();
        comment.user = new User();
        comment.notice = new Notice();
        comment.date = new Date;
        const body = req["body"];

        comment.user.id = parseInt(req.user.id);
        comment.notice.id = body.notice_id;
        comment.content = body.content;

        return comment;
    }

    public async processEditData(req : Request): Promise<Comment> {
        const comment = new Comment();
        comment.user = new User();
        comment.notice = new Notice();
        const body = req["body"];

        comment.notice.id = body.notice_id;
        comment.content = body.content;

        return comment;
    }

    public async create(req : Request, res : Response, next) : Promise<Response>{
        try{
            const statusCode = await this.validateCreate(req);

            if(statusCode != 200)
                return res.status(statusCode).send();

            const comment: Comment = await this.processCreateData(req);

            const result: Comment[] = await this.repository.save([comment]);
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

            const comment: Comment = await this.processEditData(req);

            const foundComment = await this.repository.findOne(req.params["id"]);
            this.repository.merge(foundComment, comment);

            const result = await this.repository.save(foundComment);

            return res.json(result);
        }catch(err){
            return next();
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
