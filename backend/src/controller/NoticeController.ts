import { getRepository, getConnection, Raw } from "typeorm";
import { Notice } from '../model/Notice';
import { Request, Response } from 'express';
import { User, UserRole } from '../model/User';
import { Tag } from '../model/Tag';
import escape from 'pg-escape';
import cloudinary from 'cloudinary'
import cloudConfig from '../config/cloudinaryConfig'

import { Forbidden, NotFound } from '../Errors';

cloudinary.v2.config(cloudConfig)

// semelhante para edição e delete
export async function validateCreate(req : Request): Promise<number>{
	// somente usuario adm e profissional pode postar uma noticia
	if(req.user.type == UserRole.ADMIN || req.user.type == UserRole.PROFISSIONAL)
		return;
	throw Forbidden;
}

export async function validateEdit(req : Request): Promise<number>{
	// somente o próprio usuário que criou pode alterar
	const editedNotice : Notice = await getRepository(Notice).findOne(req.params["id"]);
	if(editedNotice){
		if(parseInt(req.user.id) == editedNotice.user.id)
			return;
		throw new Forbidden;
	}
	throw new NotFound;
}

export async function validateDelete(req : Request): Promise<number>{
	// adm e mod pode excluir qualquer noticia
	if(req.user.type == UserRole.ADMIN /*|| req.user.type == UserRole.MODERADOR*/)
		return;
	
	// somente o proprio usuario pode excluir a sua noticia
	const editedNotice : Notice = await getRepository(Notice).findOne(req.params["id"]);
	if(parseInt(req.user.id) == editedNotice.user.id)
		return;

	throw new Forbidden;
}

export async function getAll(req : Request, res : Response, next) : Promise<Response> {
	try{
		let page = Number(req.query["page"]) || 1;
		let limit = Number(req.query["limit"]) || 8;			

		if (req.query["tags"]) {
			const queryTag = String(req.query["tags"]).split(',').map(tag => tag.trim());
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
				.leftJoin("notice.user", "user")
				.where("notice_tags.tagId IN (:...tagsId)", { tagsId })
				.groupBy("notice.id")
				.having('COUNT(notice.id) = :length', {length: tags.length})
				.orderBy("id", "DESC");

			const count = (await queryBuilder.getRawMany()).length;
			res.header('X-Total-Count', String(count));

			const data = (await queryBuilder.limit(limit).offset(limit * (page - 1))
				.getRawMany()).map(obj => obj.id);

			if(data.length !== 0){
				const queryBuilder = getRepository(Notice)
					.createQueryBuilder("notice")
					.where("notice.id IN (:...id)", { id : data })
					.leftJoinAndSelect("notice.user", "user")
					.leftJoinAndSelect("notice.tags", "tags")
				if(req.query["userid"])
					queryBuilder.where(escape(`"user".id = %L`, `${req.query["userid"]}`));
				return res.json(await queryBuilder.getMany());
			}
			throw new NotFound;
			
		} else {
			const queryBuilder = getRepository(Notice)
			.createQueryBuilder("notice")
			.leftJoinAndSelect("notice.user", "user")
			.leftJoinAndSelect("notice.tags", "tags")
			.orderBy("notice.id", "DESC")

			let query : string;
			if(req.query["title"])
				query = escape(`title ILIKE %L`, `%${req.query["title"]}%`);
			else if(req.query["abstract"])
				query = escape(`abstract ILIKE %L`, `%${req.query["abstract"]}%`);
			else if(req.query["tag"])
				query = escape(`"Notice_tags".description ILIKE %L`, `%${req.query["tag"]}%`);
			queryBuilder.where(query);

			if(req.query["userid"])
				queryBuilder.andWhere(escape(`"user".id = %L`, `${req.query["userid"]}`));

			const count = await queryBuilder.getCount();
			res.header('X-Total-Count', String(count));

			queryBuilder.take(limit).skip(limit * (page - 1));

			const notices = await queryBuilder.getMany();
			if(notices && notices.length > 0)
				return res.json(notices);
			throw new NotFound;
		}
	} catch (err) { 
		return next(err);
	}
}

export async function getByPk(req : Request, res : Response, next) : Promise<Response> {
	try {
		const { viewed } = req.query;

		if (viewed == 'true') {
			getConnection().transaction(async manager => {
				const repository = manager.getRepository(Notice);
				const foundNotice = await repository.findOne(req.params["id"]);

				foundNotice.views++;
				const result = await repository.save(foundNotice);
				return res.json(result);
			});
		} else {
			const notice = await getRepository(Notice).findOne(req.params["id"], { select: [
					'id', 'title', 'abstract', 'text',
					'date', 'imageId', 'imageType', 'views',
				],
				relations: ['user', 'tags']
			});
			if (!notice)
				throw new NotFound;

			return res.json(notice);
		}
	} catch (err) {
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
	}else if(body.imageId == null){
		notice.imageType = null;
	}

	return notice;
}

export async function verifyTags(tags: Tag[]) {
	const data = await getRepository(Tag).findByIds(tags.map(tag => (tag.id)));
	return tags.length === data.length;
}

export async function create(req : Request, res : Response, next) : Promise<Response>{
	try{
		await validateCreate(req);

		const notice: Notice = await processCreateData(req);

		const tags = await verifyTags(notice.tags);

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
		await validateEdit(req);

		const notice: Notice = await processEditData(req);

		const foundNotice = await getRepository(Notice).findOne(req.params["id"], {
			select: [
				"id", 
				"title", 
				"abstract", 
				"text",
				"imageId",
				"imageType"
			]});

		if (foundNotice) {
			if (foundNotice.imageId && notice.imageId !== undefined && (foundNotice.imageId !== notice.imageId || notice.imageId === null)){
				try{
					await cloudinary.v2.uploader.destroy(foundNotice.imageId)
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
		await validateDelete(req);

		const notice = await getRepository(Notice).findOne(req.params["id"], {
			select: [
				"id", 
				"imageId"
			]});
		if(notice){
			if (notice.imageId){
				try{
					await cloudinary.v2.uploader.destroy(notice.imageId)
				} catch(err) {
					console.log("Error deleting the image...")
					return next(err);
				}
			}    
			await getRepository(Notice).delete(req.params["id"]);
			return res.status(200).send();
		}else{
			throw new NotFound();
		}
	}catch(err){
		return next(err);
	}
}
