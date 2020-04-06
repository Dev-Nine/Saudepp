import { Connection, Repository, getConnection, ObjectID, DeleteResult } from "typeorm";

import { Notice } from '../model/Notice';
import GenericController from './GenericController';

import { User } from '../model/User';

interface ReqBody {
    id: number;
    titulo: string;
    date: Date;
    texto: string;
    user: User;
}

export default class UserController extends GenericController<Notice> {
    constructor() {
        super(Notice);
    }

    public processBody(body): Notice | undefined {
        const notice = new Notice();
        notice.id = body.id;
        notice.title = body.title;
        notice.text = body.text;
        notice.date = body.date;
        notice.user = body.user;

        if (notice.isValid())
            return notice;
        return undefined;
    }
}