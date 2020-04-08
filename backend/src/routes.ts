import { Router, Response } from "express";
import { QueryFailedError } from "typeorm";

import UserController from "./controller/UserController";
import NoticeController from "./controller/NoticeController";
import { Notice } from "./model/Notice";

export default class Routes {
    public routes: Router;
    private userController: UserController;
    //private noticeController: NoticeController;

    constructor() {
        this.routes = Router();
        this.userController = new UserController();
        //this.noticeController = new NoticeController();
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
        this.routes.get("/users", this.userController.getAll.bind(this.userController));

        //Return user by id
        this.routes.get("/users/:id", this.userController.getByPk.bind(this.userController));

        //Creating a user
        this.routes.post("/users", this.userController.create.bind(this.userController));

        //Editing a user
        this.routes.put("/users/:id", this.userController.edit.bind(this.userController));

        //Deleting a user
        this.routes.delete("/users/:id", this.userController.delete.bind(this.userController));
        
    }
}