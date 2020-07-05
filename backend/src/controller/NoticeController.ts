import { Repository, getConnection, DeleteResult, getRepository } from "typeorm";
import { Notice } from '../model/Notice';
import { Request, Response } from 'express';
import { User, UserRole } from '../model/User';
import { Tag } from '../model/Tag';

import { NotFound } from '../Errors';

export default class NoticeController {
    private repository : Repository<Notice>;

    constructor(){
        this.repository = getConnection().getRepository(Notice);
    }

    // semelhante para edição e delete
    public async validateCreate(req : Request): Promise<number>{
        // somente usuario adm e profissional pode postar uma noticia
        if(req.user.type == UserRole.ADMIN || req.user.type == UserRole.PROFISSIONAL)
            return 200;
        return 403;
    }

    public async validateEdit(req : Request): Promise<number>{
        // somente o próprio usuário que criou pode alterar
        const editedNotice : Notice = await this.repository.findOne(req.params["id"]);
        if(parseInt(req.user.id) == editedNotice.user.id)
            return 200;

        return 403;
    }

    public async validateDelete(req : Request): Promise<number>{
        // adm e mod pode excluir qualquer noticia
        if(req.user.type == UserRole.ADMIN /*|| req.user.type == UserRole.MODERADOR*/)
            return 200;
        
        // somente o proprio usuario pode excluir a sua noticia
        const editedNotice : Notice = await this.repository.findOne(req.params["id"]);
        if(parseInt(req.user.id) == editedNotice.user.id)
            return 200;

        return 403;
    }

    public async getAll(req : Request, res : Response, next) : Promise<Response> {
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
                        
                const queryBuilder = this.repository
                    .createQueryBuilder("notice")
                    .select("notice.id, COUNT(notice.id) AS idCount")
                    .leftJoin("notice.tags", "tags")
                    .where("notice_tags.tagId IN (:...tagsId)", { tagsId })
                    .groupBy("notice.id")
                    .having('COUNT(notice.id) = :length', {length: tags.length});

                const data = await (await queryBuilder.getRawMany()).map(obj => obj.id);

                if(data.length !== 0){
                    const notices = await this.repository
                        .createQueryBuilder("notice")
                        .where("notice.id IN (:...id)", { id : data })
                        .leftJoinAndSelect("notice.user", "user")
                        .leftJoinAndSelect("notice.tags", "tags")
                        .getMany()
                    res.send(notices);
                }
                throw new NotFound;
                
            } else {
                const notices = await this.repository.find();
                if(notices && notices.length > 0)
                return res.json(notices);
            
                const err = new NotFound;
                return next(err);
            
            }
        } catch (err) { 
            return next(err);
        }
    }

    public async getByPk(req : Request, res : Response, next) : Promise<Response> {
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
            const notice = await this.repository.findOne(req.params["id"]);
            if(notice)
                return res.json(notice);
            const err = new NotFound;
                return next(err);
        }
    }

    public async processCreateData(req : Request): Promise<Notice> {
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

        notice.views = 0;

        return notice;
    }

    public async processEditData(req : Request): Promise<Notice> {
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

        notice.title = body.title;
        notice.text = body.text;
        notice.user.id = parseInt(req.user.id);
        notice.abstract = body.abstract;

        return notice;
    }

    public async verifyTags(tags: Tag[]) {
	const data = await getRepository(Tag).findByIds(tags.map(tag => (tag.id)));

	return tags.length === data.length;
    }

    public async create(req : Request, res : Response, next) : Promise<Response>{
        try{
            const statusCode = await this.validateCreate(req);

            if(statusCode != 200)
                return res.status(statusCode).send();

            const notice: Notice = await this.processCreateData(req);

            const tags = await this.verifyTags(notice.tags);
    
            if (!tags)
                throw Error("Tag doesn't exist");

            const result: Notice[] = await this.repository.save([notice]);
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

            const notice: Notice = await this.processEditData(req);

            const foundNotice = await this.repository.findOne(req.params["id"]);
			if (foundNotice) {
				this.repository.merge(foundNotice, notice);

				const result = await this.repository.save(foundNotice);
				return res.json(result);
			}
			throw new NotFound;
        }catch(err){
            return next(err);
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
