import { Router, Response } from "express";
import { QueryFailedError, getRepository, getConnection } from "typeorm";

import UserController from "./controller/UserController";
import NoticeController from "./controller/NoticeController";
import CommentController from "./controller/CommentController";
import SessionController from "./controller/SessionController";


import ensureAuthentication from './middlewares/ensureAuthentication'
import verifyAuthentication from './middlewares/verifyAuthentication'
import TagController from "./controller/TagController";
import SubTagController from "./controller/SubTagController";

import { CovidInfo } from "./model/CovidInfo";

export default class Routes {
    public routes: Router;
    private userController: UserController;
    private noticeController: NoticeController;
    private commentController: CommentController;
    private tagController: TagController;
    private subTagController: SubTagController;
    private sessionController: SessionController;

    constructor() {
        this.routes = Router();
        this.userController = new UserController();
        this.noticeController = new NoticeController();
        this.commentController = new CommentController();
        this.tagController = new TagController();
        this.subTagController = new SubTagController();
        this.sessionController = new SessionController();
    }

    public defineRoutes() {
        // USUARIOS
        this.routes.get("/users", this.userController.getAll.bind(this.userController));
        this.routes.get("/users/:id", this.userController.getByPk.bind(this.userController));
        this.routes.post("/users", verifyAuthentication, this.userController.create.bind(this.userController));
        this.routes.put("/users/:id", ensureAuthentication, this.userController.edit.bind(this.userController));
        this.routes.delete("/users/:id", ensureAuthentication, this.userController.delete.bind(this.userController));

        // TAG
        this.routes.get("/tags", this.tagController.getAll.bind(this.tagController));
        this.routes.get("/tags/:id", this.tagController.getByPk.bind(this.tagController));
        this.routes.post("/tags", ensureAuthentication, this.tagController.create.bind(this.tagController));
        this.routes.put("/tags/:id", ensureAuthentication, this.tagController.edit.bind(this.tagController));
        this.routes.delete("/tags/:id", ensureAuthentication, this.tagController.delete.bind(this.tagController));

        // SUBTAGS
        this.routes.get("/subtags", this.subTagController.getAll.bind(this.subTagController));
        this.routes.get("/subtags/:id", this.subTagController.getByPk.bind(this.subTagController));
        this.routes.post("/subtags", ensureAuthentication, this.subTagController.create.bind(this.subTagController));
        this.routes.put("/subtags/:id", ensureAuthentication, this.subTagController.edit.bind(this.subTagController));
        this.routes.delete("/subtags/:id", ensureAuthentication, this.subTagController.delete.bind(this.subTagController));

        // NOTICIAS
        this.routes.get("/notices", this.noticeController.getAll.bind(this.noticeController));
        this.routes.get("/notices/:id",this.noticeController.getByPk.bind(this.noticeController));
        this.routes.post("/notices", ensureAuthentication, this.noticeController.create.bind(this.noticeController));
        this.routes.put("/notices/:id", ensureAuthentication, this.noticeController.edit.bind(this.noticeController));
        this.routes.delete("/notices/:id", ensureAuthentication, this.noticeController.delete.bind(this.noticeController));

        // COMENTARIOS
        this.routes.get("/comments", this.commentController.getAll.bind(this.commentController));
        this.routes.get("/comments/:id", this.commentController.getByPk.bind(this.commentController));
        this.routes.post("/comments", ensureAuthentication, this.commentController.create.bind(this.commentController));
        this.routes.put("/comments/:id", ensureAuthentication, this.commentController.edit.bind(this.commentController));
        this.routes.delete("/comments/:id", ensureAuthentication, this.commentController.delete.bind(this.commentController));

        // SESSÕES (LOGIN)
        this.routes.post("/sessions", this.sessionController.auth.bind(this.sessionController));
    
        // COVID (INFO)
        this.routes.get('/covid', async function getInfo (req, res) {
            const query = getConnection().getRepository(CovidInfo);

            //Get the last request saved
            const result = await query.findOne({
                order: {
                    id: 'DESC',
                }
            });

            // console.log(result);

            if (result)
                return res.json(result);
            else 
                return res.status(400).send( { error: "A error ocurred!" });
                
        });       

    }
}