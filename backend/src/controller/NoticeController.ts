import { Repository, getConnection, DeleteResult, ObjectID, ObjectType } from "typeorm";

import { Notice } from '../model/Notice';
import GenericController from './GenericController';
import { Request } from 'express';

import { User } from '../model/User';

export default class NoticeController extends GenericController<Notice> {
    private notice : Notice;

    constructor() {
        super(Notice);
    }

    public processData(body : Request["body"]): Notice | undefined {
        this.notice.id = body.id;
        this.notice.title = body.title;
        this.notice.text = body.text;
        this.notice.abstract = body.abstract;
        this.notice.date = new Date;

        if (this.notice.isValid())
            return this.notice;
        return undefined;
    }

    public async create(body : Request["body"], header : Request["headers"]): Promise<Notice[]>{

    }
}