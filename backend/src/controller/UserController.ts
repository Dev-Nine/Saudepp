import { User } from '../model/User';
import { Notice } from '../model/Notice';
import GenericController from './GenericController';

export default interface UserReqBody {
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

    public processBody(body): User | undefined {
        const user = new User;
        user.id = body.id;
        user.name = body.name;
        user.email = body.email;
        user.notices = body.notices;
        user.password = body.password;

        if (user.isValid()) 
            return user; 
        return undefined;
    }
}