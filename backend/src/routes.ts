import { Router, Response } from "express";
import { QueryFailedError } from "typeorm";

import UserController from "./controller/UserController";
import NoticeController from "./controller/NoticeController";
import CommentController from "./controller/CommentController";
import SessionController from "./controller/SessionController";

import ensureAuthentication from './middlewares/ensureAuthenticated'

export default class Routes {
    public routes: Router;
    private userController: UserController;
    private noticeController: NoticeController;
    private commentController: CommentController;
    private sessionController: SessionController;

    constructor() {
        this.routes = Router();
        this.userController = new UserController();
        this.noticeController = new NoticeController();
        this.commentController = new CommentController();
        this.sessionController = new SessionController();
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

        // NOTICIAS

        this.routes.get("/notices", this.noticeController.getAll.bind(this.noticeController));
        this.routes.get("/notices/:id",this.noticeController.getByPk.bind(this.noticeController));
        this.routes.post("/notices", this.noticeController.create.bind(this.noticeController));
        this.routes.put("/notices/:id", this.noticeController.edit.bind(this.noticeController));
        this.routes.delete("/notices/:id", this.noticeController.delete.bind(this.noticeController));

        // COMENTARIOS

        this.routes.get("/comments", this.commentController.getAll.bind(this.commentController));
        this.routes.get("/comments/:id", this.commentController.getByPk.bind(this.commentController));
        this.routes.post("/comments", this.commentController.create.bind(this.commentController));
        this.routes.put("/comments/:id", this.commentController.edit.bind(this.commentController));
        this.routes.delete("/comments/:id", this.commentController.delete.bind(this.commentController));

        // SESSÕES (LOGIN)
        this.routes.post("/sessions", this.sessionController.auth.bind(this.sessionController) )
        
    }
}