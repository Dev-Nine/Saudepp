import { Connection, Repository, getConnection, ObjectID, DeleteResult } from "typeorm";

import { User } from '../model/User';
import GenericController from './GenericController';

interface ReqBody {
    id: number,
    age: number,
    firstName: string,
    lastName: string
}

export default class UserController extends GenericController<User> {
    constructor() {
        super(User);
    }
}