import { Repository, getConnection, DeleteResult } from "typeorm";
import { Notice } from '../model/Notice';
import { Request, Response } from 'express';
import { User } from '../model/User';
import { Tag } from '../model/Tag';
import { SubTag } from '../model/SubTag';

export default class NoticeController {
    private repository : Repository<Notice>;

    constructor(){
        this.repository = getConnection().getRepository(Notice);
    }

    // semelhante para edição e delete
    public async validateCreate(req : Request): Promise<number>{
        // somente usuario adm e profissional pode postar uma noticia
        if(req.user.type == 0 || req.user.type == 2)
            return 200;
        return 403;
    }

    public async validateEdit(req : Request): Promise<number>{
        // adm pode editar qualquer noticia
        if(req.user.type == 0)
            return 200;
        
        // novamente, somente profissional
        if(req.user.type == 2){
            const editedNotice : Notice = await this.repository.findOne(req.params["id"]);
            if(parseInt(req.user.id) == editedNotice.user.id)
                return 200;
        }

        return 403;
    }

    public async validateDelete(req : Request): Promise<number>{
        return this.validateEdit(req);
    }

    public async getAll(req : Request, res : Response) : Promise<Response> {
        const notices = await this.repository.find();
        if(notices && notices.length > 0)
            return res.json(notices);
        else
            return res.status(404).send( { error: 'Not found'} );
    }

    public async getByPk(req : Request, res : Response) : Promise<Response> {
        const notice = await this.repository.findOne(req.params["id"]);
        if(notice)
            return res.json(notice);
        else
            return res.status(404).send( { error: 'Not found'} );
    }

    public async processCreateData(req : Request): Promise<Notice> {
        const notice = new Notice();
        notice.user = new User();
        const body = req["body"];

        notice.tags = [];
        notice.subtags = [];

        if(body.tags !== undefined && body.tags.length > 0){
            for (const tagAttr of body.tags){
                let tag = new Tag();
                tag.id = tagAttr.id;
                notice.tags.push(tag);
            }
        }

        if(body.subtags !== undefined && body.subtags.length > 0){
            for (const subTagAttr of body.subtags){
                let subtag = new SubTag();
                subtag.id = subTagAttr.id;
                notice.subtags.push(subtag);
            }
        }

        notice.title = body.title;
        notice.text = body.text;
        notice.user.id = parseInt(req.user.id);
        notice.abstract = body.abstract;
        notice.date = new Date;

        return notice;
    }

    public async processEditData(req : Request): Promise<Notice> {
        const notice = new Notice();
        notice.user = new User();
        const body = req["body"];

        if(body.tags !== undefined && body.tags.length > 0){
            notice.tags = [];
            for (const tagAttr of body.tags){
                let tag = new Tag();
                tag.id = tagAttr.id;
                notice.tags.push(tag);
            }
        }

        if(body.subtags !== undefined && body.subtags.length > 0){
            notice.subtags = [];
            for (const subTagAttr of body.subtags){
                let subtag = new SubTag();
                subtag.id = subTagAttr.id;
                notice.subtags.push(subtag);
            }
        }

        notice.title = body.title;
        notice.text = body.text;
        notice.user.id = parseInt(req.user.id);
        notice.abstract = body.abstract;

        return notice;
    }

    public async create(req : Request, res : Response) : Promise<Response>{
        try{
            const statusCode = await this.validateCreate(req);

            if(statusCode != 200)
                return res.status(statusCode).send();

            const notice: Notice = await this.processCreateData(req);

            if(notice.tags.length > 0 || notice.subtags.length > 0){
                const result: Notice[] = await this.repository.save([notice]);
                return res.json(result);
            }
            throw new Error("Needs at least 1 tag or subtag");
        }catch(err){
            if(err instanceof Error){
                console.log(err.stack);
                console.log(err.message);
            }
            return res.status(400).send();
        }
    }

    public async edit(req : Request, res : Response): Promise<Response> {
        try{
            const statusCode = await this.validateEdit(req);
            if(statusCode != 200)
                return res.status(statusCode).send();

            const notice: Notice = await this.processEditData(req);

            const foundNotice = await this.repository.findOne(req.params["id"]);
            this.repository.merge(foundNotice, notice);

            if(foundNotice.tags.length > 0 || foundNotice.subtags.length > 0){
                const result = await this.repository.save(foundNotice);
                return res.json(result);
            }
            throw new Error("Needs at least 1 tag or subtag");
            
        }catch(err){
            if(err instanceof Error){
                console.log(err.stack);
                console.log(err.message);
            }
            return res.status(400).send();
        }
    }

    public async delete(req : Request, res : Response): Promise<Response> {
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
            if(err instanceof Error){
                console.log(err.stack);
                console.log(err.message);
            }
            return res.status(400).send();
        }
    }
}
