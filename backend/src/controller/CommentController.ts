import { getRepository, DeleteResult } from "typeorm";
import { Request, Response } from 'express';
import { Comment } from '../model/Comment';
import { User, UserRole } from '../model/User';
import { Notice } from '../model/Notice';

import { NotFound } from '../Errors';

// qualquer um pode realizar um comentario
export async function validateCreate(req : Request): Promise<number>{ return 200 }

export async function validateEdit(req : Request): Promise<number>{
	// somente o proprio usuario pode alterar seu comentario
	const editedComment : Comment = await getRepository(Comment).findOne(req.params["id"]);
	if(parseInt(req.user.id) == editedComment.user.id)
		return 200;

	return 403;
}

export async function validateDelete(req : Request): Promise<number>{
	// adm e mod pode excluir qualquer comentario
	if(req.user.type == UserRole.ADMIN /*|| req.user.type == UserRole.MODERADOR*/)
		return 200;

	const editedComment : Comment = await getRepository(Comment).findOne(req.params["id"]);
	if(parseInt(req.user.id) == editedComment.user.id)
		return 200;

	return 403;
}

export async function getAll(req : Request, res : Response, next) : Promise<Response> {
	const comments = await getRepository(Comment).find();
	if(comments && comments.length > 0)
		return res.json(comments);
	
	const err = new NotFound;
	return next(err);
}

export async function getByPk(req : Request, res : Response, next) : Promise<Response> {
	const comment = await getRepository(Comment).findOne(req.params["id"]);
	if(comment)
		return res.json(comment);

	const err = new NotFound;
	return next(err);
}

export async function processCreateData(req : Request): Promise<Comment> {
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

export async function processEditData(req : Request): Promise<Comment> {
	const comment = new Comment();
	comment.user = new User();
	comment.notice = new Notice();
	const body = req["body"];

	comment.notice.id = body.notice_id;
	comment.content = body.content;

	return comment;
}

export async function create(req : Request, res : Response, next) : Promise<Response>{
	try{
		const statusCode = await validateCreate(req);

		if(statusCode != 200)
			return res.status(statusCode).send();

		const comment: Comment = await processCreateData(req);

		const result: Comment[] = await getRepository(Comment).save([comment]);
		return res.json(result);
	}catch(err){
		return next(err);
	}
}

export async function edit(req : Request, res : Response, next): Promise<Response> {
	try{
		const statusCode = await validateEdit(req);
		if(statusCode != 200)
			return res.status(statusCode).send();

		const comment: Comment = await processEditData(req);

		const foundComment = await getRepository(Comment).findOne(req.params["id"]);
		if (foundComment) {
			getRepository(Comment).merge(foundComment, comment);

			const result = await getRepository(Comment).save(foundComment);

			return res.json(result);
		}
		throw new NotFound;
	}catch(err){
		return next();
	}
}

export async function remove(req : Request, res : Response, next): Promise<Response> {
	try{
		const statusCode = await validateDelete(req);
		if(statusCode != 200)
			return res.status(statusCode).send();

		const result: DeleteResult = await getRepository(Comment).delete(req.params["id"]);
		if(result.affected >= 1)
			return res.status(200).send();
		else
			return res.status(404).send();
	}catch(err){
		return next(err);
	}
}
