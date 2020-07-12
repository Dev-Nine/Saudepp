import { getConnection, DeleteResult, getRepository } from "typeorm";
import { Notice } from '../model/Notice';
import { Request, Response } from 'express';
import { User, UserRole } from '../model/User';
import { Tag } from '../model/Tag';
import imgurApi, { config } from '../utils/imgurApi'

import { NotFound } from '../Errors';

// semelhante para edição e delete
export async function validateCreate(req : Request): Promise<number>{
	// somente usuario adm e profissional pode postar uma noticia
	if(req.user.type == UserRole.ADMIN || req.user.type == UserRole.PROFISSIONAL)
		return 200;
	return 403;
}

export async function validateEdit(req : Request): Promise<number>{
	// somente o próprio usuário que criou pode alterar
	const editedNotice : Notice = await getRepository(Notice).findOne(req.params["id"]);
	if(editedNotice){
		if(parseInt(req.user.id) == editedNotice.user.id)
			return 200;
		return 403;
	}else{
		return 404
	}
}

export async function validateDelete(req : Request): Promise<number>{
	// adm e mod pode excluir qualquer noticia
	if(req.user.type == UserRole.ADMIN /*|| req.user.type == UserRole.MODERADOR*/)
		return 200;
	
	// somente o proprio usuario pode excluir a sua noticia
	const editedNotice : Notice = await getRepository(Notice).findOne(req.params["id"]);
	if(parseInt(req.user.id) == editedNotice.user.id)
		return 200;

	return 403;
}

export async function getAll(req : Request, res : Response, next) : Promise<Response> {
	try{
		if (req.query.tag) {
			const queryTag = String(req.query.tag).split(',').map(tag => tag.trim());
			const tagObjects = queryTag.map(tag => ({id: tag}));
			const tags = await getRepository(Tag)
				.find({
					where: tagObjects
				});
			if (!tags || tags.length === 0)
				next(Error("Tag not found"));

			const tagsId = tags.map(tag => tag.id);
					
			const queryBuilder = getRepository(Notice)
				.createQueryBuilder("notice")
				.select("notice.id, COUNT(notice.id) AS idCount")
				.leftJoin("notice.tags", "tags")
				.where("notice_tags.tagId IN (:...tagsId)", { tagsId })
				.groupBy("notice.id")
				.having('COUNT(notice.id) = :length', {length: tags.length});

			const data = await (await queryBuilder.getRawMany()).map(obj => obj.id);

			if(data.length !== 0){
				const notices = await getRepository(Notice)
					.createQueryBuilder("notice")
					.where("notice.id IN (:...id)", { id : data })
					.leftJoinAndSelect("notice.user", "user")
					.leftJoinAndSelect("notice.tags", "tags")
					.getMany()
				res.send(notices);
			}
			throw new NotFound;
			
		} else {
			const notices = await getRepository(Notice).find();
			if(notices && notices.length > 0)
			return res.json(notices);
		
			const err = new NotFound;
			return next(err);
		
		}
	} catch (err) { 
		return next(err);
	}
}

export async function getByPk(req : Request, res : Response, next) : Promise<Response> {
	const { viewed } = req.query;

	if(viewed == 'true'){
		getConnection().transaction(async manager => {
			const repository = manager.getRepository(Notice);
			const foundNotice = await repository.findOne(req.params["id"], { select: [
				'id',
				'title',
				'abstract',
				'date',
				'text',
				'views',
				'user',
				'tags'
			]});

			foundNotice.views++;
			const result = await repository.save(foundNotice);
			return res.json(result);
		});
	}else{
		const notice = await getRepository(Notice).findOne(req.params["id"]);
		if(notice)
			return res.json(notice);
		const err = new NotFound;
			return next(err);
	}
}

export async function processCreateData(req : Request): Promise<Notice> {
	const notice = new Notice();
	notice.user = new User();
	const body = req["body"];

	notice.tags = [];

	if(body.tags !== undefined){
		for (const tagAttr of body.tags){
			let tag = new Tag();
			tag.id = tagAttr.id;
			notice.tags.push(tag);
		}
	}

	notice.title = body.title;
	notice.text = body.text;
	notice.user.id = parseInt(req.user.id);
	notice.abstract = body.abstract;
	notice.date = new Date;

	if(body.imageId){
		notice.imageId = body.imageId;
		notice.imageType = body.imageType;
		notice.deleteHash = body.deleteHash;
	}

	notice.views = 0;

	return notice;
}

export async function processEditData(req : Request): Promise<Notice> {
	const notice = new Notice();
	const body = req["body"];

	if(body.tags !== undefined){
		notice.tags = [];
		for (const tagAttr of body.tags){
			let tag = new Tag();
			tag.id = tagAttr.id;
			notice.tags.push(tag);
		}
	}

	notice.title = body.title;
	notice.text = body.text;
	notice.abstract = body.abstract;

	if(body.imageId){
		notice.imageId = body.imageId;
		notice.imageType = body.imageType;
		notice.deleteHash = body.deleteHash;
	}

	return notice;
}

export async function verifyTags(tags: Tag[]) {
	const data = await getRepository(Tag).findByIds(tags.map(tag => (tag.id)));
	return tags.length === data.length;
}

export async function create(req : Request, res : Response, next) : Promise<Response>{
	try{
		const statusCode = await this.validateCreate(req);

		if(statusCode != 200)
			return res.status(statusCode).send();

		const notice: Notice = await this.processCreateData(req);

		const tags = await this.verifyTags(notice.tags);

		if (!tags)
			throw Error("Tag doesn't exist");

		const result: Notice[] = await getRepository(Notice).save([notice]);
		return res.json(result);
	}catch(err){
		return next(err);
	}
}

export async function edit(req : Request, res : Response, next): Promise<Response> {
	try{
		const statusCode = await this.validateEdit(req);
		if(statusCode != 200)
			return res.status(statusCode).send();

		const notice: Notice = await this.processEditData(req);

		const foundNotice = await getRepository(Notice).findOne(req.params["id"], {
			select: [
				"id", 
				"title", 
				"abstract", 
				"text",
				"imageId",
				"imageType",
				"deleteHash",
			]});

		if (foundNotice) {
			console.log(foundNotice.deleteHash)
			if (foundNotice.imageId && notice.imageId){
				try{
					await imgurApi.delete(`image/${foundNotice.deleteHash}`, config)
				} catch(err) {
					console.log("Error deleting the image...")
					return next(err);
				}
			}

			getRepository(Notice).merge(foundNotice, notice);

			const result = await getRepository(Notice).save(foundNotice);
			return res.json(result);
		}
		throw new NotFound;
	}catch(err){
		return next(err);
	}
}

export async function remove(req : Request, res : Response, next): Promise<Response> {
	try{
		const statusCode = await this.validateDelete(req);
		if(statusCode != 200)
			return res.status(statusCode).send();

		const notice = await getRepository(Notice).findOne(req.params["id"], {
			select: [
				"id", 
				"title", 
				"abstract", 
				"text",
				"imageId",
				"imageType",
				"deleteHash",
			]});
		if(notice){
			if (notice.imageId){
				console.log(notice.deleteHash)
				try{
					await imgurApi.delete(`image/${notice.deleteHash}`, config)
				} catch(err) {
					console.error("Error deleting the image...")
					return next(err);
				}
			}    
			const result: DeleteResult = await getRepository(Notice).delete(req.params["id"]);
			return res.status(200).send();
		}else{
			throw new NotFound();
		}
	}catch(err){
		return next(err);
	}
}
