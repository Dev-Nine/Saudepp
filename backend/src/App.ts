'use strict'
import * as express from 'express';
import { Application } from 'express';

import UserController from './controller/UserController';
import NoticeController from './controller/NoticeController';
import { QueryFailedError } from 'typeorm';
import { User } from './model/User';
import UserReqBody from './controller/UserController';

export default class App {
    public app: Application;
    private userController: UserController;
    private noticeController: NoticeController;

    constructor() {
        this.app = express();
        this.userController = new UserController();
        this.noticeController = new NoticeController();
    }

    private midelwares(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        //! Register routes

        // USUARIOS

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
            try{
                const results = await this.userController.create(req.body);
                return res.send(results);
            } catch (err) {
                console.error(err);
                if (err instanceof QueryFailedError) {
                    return res.json({
                        error: "Query Failed Error",
                    });
                } else if (err instanceof Error) {
                    return res.status(400).json({error: (err.message)});
                }
            }
        });

        //Editing a user
        this.app.put('/users/:id', async (req, res) => {
            try {
                const results = await this.userController.edit(req.body, req.params.id);
                return res.send(results);
            } catch (err) {
                console.error(err);
                if (err instanceof QueryFailedError) {
                    return res.json({
                        error: "Query Failed Error",
                    });
                } else if (err instanceof Error) {
                    return res.status(400).json({error: (err.message)});
                }
            }
        });

        //Deleting a user
        this.app.delete('/users/:id', async (req, res) => {
            const result = await this.userController.delete(req.params.id);
            return res.send(result);
        });

        // NOTICIAS

        //Return all notices
        this.app.get('/notices', async (req, res) => {
            const notices = await this.noticeController.getAll();
            return res.json(notices);
        });

        //Return notice by id
        this.app.get('/notice/:id', async (req, res) => {
            const notice = await this.noticeController.getByPk(req.params.id);
            return res.json(notice);
        });

        //Creating a notice
        this.app.post('/notices', async (req, res) => {
            try{
                const results = await this.noticeController.create(req.body);
                return res.send(results);
            } catch (err) {
                console.error(err);
                if (err instanceof QueryFailedError) {
                    return res.status(400).json({
                        error: "Query Failed Error",
                    });
                } else if (err instanceof Error) {
                    return res.status(400).json({error: (err.message)});
                }
            }
        });

        //Editing a notice
        this.app.put('/notices', async (req, res) => {
            try{
                const results = await this.noticeController.edit(req.body, req.params.id);
                return res.send(results);
            } catch (err) {
                console.error(err);
                if (err instanceof QueryFailedError) {
                    return res.status(400).json({
                        error: "Query Failed Error",
                    });
                } else if (err instanceof Error) {
                    return res.status(400).json({error: (err.message)});
                }
            }
        });
    }
    
    public start(port? : number, args? : any): void {
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