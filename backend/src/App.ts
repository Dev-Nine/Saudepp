import * as express from 'express';
import { Application } from 'express';

import UserController from './controller/UserController';

export default class App {
    public app: Application;
    private userController: UserController;

    constructor() {
        this.app = express();
        this.userController = new UserController();    
    }

    private midelwares(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        //! Register routes
        //Return all users
        this.app.get('/users', async (req, res) => {
            const users = await this.userController.getAll();
            return res.json(users);
        });

        //Return user by id
        this.app.get('/users/:id', async (req, res) => {
            const user = await this.userController.getByPk(req.params.id);
            return res.json(user);
        });

        //Creating a user
        this.app.post('/users', async (req, res) => {
            const results = await this.userController.create(req.body);
            return res.send(results);
        });

        //Editing a user
        this.app.put('/users/:id', async (req, res) => {
            const results = await this.userController.edit(req.body);
            return res.send(results);
        });

        //Deleting a user
        this.app.delete('/users/:id', async (req, res) => {
            const result = await this.userController.delete(req.params.id);
            return res.send(result);
        });
    }
    
    public start(port?, args?): void {
        this.midelwares();
        this.routes();

        if (port) {
            if (args) {
                this.app.listen(port, args);
            } else {
                this.app.listen(port);
            }
        }else {
            this.app.listen();
        }
        console.log('App is online!');
    }
}