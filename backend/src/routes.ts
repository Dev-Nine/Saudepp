import { Router, Response } from "express";
import { QueryFailedError, getConnection } from "typeorm";

import UserController from "./controller/UserController";
import NoticeController from "./controller/NoticeController";

export default class Routes {
    public routes: Router;
    private userController: UserController;
    private noticeController: NoticeController;

    constructor() {
        this.routes = Router();
        this.userController = new UserController();
        this.noticeController = new NoticeController();
    }

    public validateError(res: Response, err: Error): Response {
        console.error(err);
        if (err instanceof QueryFailedError) {
            return res.status(400).json({
                error: "Query Failed Error",
            });
        } else if (err instanceof Error) {
            return res.status(400).json({
                error: err.message,
            });
        }
    }

    public defineRoutes() {
        // USUARIOS

        //Return all users
        this.routes.get("/users", async (req, res) => {
            const users = await this.userController.getAll();
            return res.json(users);
        });

        //Return user by id
        this.routes.get("/users/:id", async (req, res) => {
            const user = await this.userController.getByPk(req.params.id);
            return res.json(user);
        });

        //Creating a user
        this.routes.post("/users", async (req, res) => {
            try {
                const results = await this.userController.create(req.body);
                return res.send(results);
            } catch (err) {
                return this.validateError(res, err);
            }
        });

        //Editing a user
        this.routes.put("/users/:id", async (req, res) => {
            try {
                const results = await this.userController.edit(req.body, req.params.id);
                return res.send(results);
            } catch (err) {
                return this.validateError(res, err);
            }
        });

        //Deleting a user
        this.routes.delete("/users/:id", async (req, res) => {
            const result = await this.userController.delete(req.params.id);
            return res.send(result);
        });

        // NOTICIAS

        //Return all notices
        this.routes.get("/notices", async (req, res) => {
            const notices = await this.noticeController.getAll();
            return res.json(notices);
        });

        //Return notice by id
        this.routes.get("/notice/:id", async (req, res) => {
            const notice = await this.noticeController.getByPk(req.params.id);
            return res.json(notice);
        });

        //Creating a notice
        this.routes.post("/notices", async (req, res) => {
            try {
                const results = await this.noticeController.create(req.body);
                return res.send(results);
            } catch (err) {
                return this.validateError(res, err);
            }
        });

        //Editing a notice
        this.routes.put("/notices", async (req, res) => {
            try {
                const results = await this.noticeController.edit(req.body, req.params.id);
                return res.send(results);
            } catch (err) {
                return this.validateError(res, err);
            }
        });
    }
}