import { Router, Response } from "express";
import { QueryFailedError } from "typeorm";

import UserController from "./controller/UserController";
import NoticeController from "./controller/NoticeController";

const routes = Router();
const userController = new UserController();
const noticeController = new NoticeController();

function validateError(res: Response, err: Error): Response {
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

// USUARIOS

//Return all users
routes.get("/users", async (req, res) => {
    const users = await userController.getAll();
    return res.json(users);
});

//Return user by id
routes.get("/users/:id", async (req, res) => {
    const user = await userController.getByPk(req.params.id);
    return res.json(user);
});

//Creating a user
routes.post("/users", async (req, res) => {
    try {
        const results = await userController.create(req.body);
        return res.send(results);
    } catch (err) {
        return validateError(res, err);
    }
});

//Editing a user
routes.put("/users/:id", async (req, res) => {
    try {
        const results = await userController.edit(req.body, req.params.id);
        return res.send(results);
    } catch (err) {
        return validateError(res, err);
    }
});

//Deleting a user
routes.delete("/users/:id", async (req, res) => {
    const result = await userController.delete(req.params.id);
    return res.send(result);
});

// NOTICIAS

//Return all notices
routes.get("/notices", async (req, res) => {
    const notices = await noticeController.getAll();
    return res.json(notices);
});

//Return notice by id
routes.get("/notice/:id", async (req, res) => {
    const notice = await noticeController.getByPk(req.params.id);
    return res.json(notice);
});

//Creating a notice
routes.post("/notices", async (req, res) => {
    try {
        const results = await noticeController.create(req.body);
        return res.send(results);
    } catch (err) {
        return validateError(res, err);
    }
});

//Editing a notice
routes.put("/notices", async (req, res) => {
    try {
        const results = await noticeController.edit(req.body, req.params.id);
        return res.send(results);
    } catch (err) {
        return validateError(res, err);
    }
});

export default routes;
