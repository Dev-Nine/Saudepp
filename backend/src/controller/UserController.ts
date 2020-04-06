import { User } from '../model/User';
import GenericController from './GenericController';

import { Notice } from '../model/Notice';

interface ReqBody {
    id: number;
    name: string;
    password: string;
    email: string;
    notices: Notice[];
}

export default class UserController extends GenericController<User> {
    constructor() {
        super(User);
    }
}