import { Router } from "express";
import { getConnection } from "typeorm";

import * as userController from "./controller/UserController";
import * as noticeController from "./controller/NoticeController";
import * as tagController from "./controller/TagController";
import * as sessionController from "./controller/SessionController";
import * as imageController from "./controller/ImageController";
import * as accountController from "./controller/AccountController";

import ensureAuthentication from './middlewares/ensureAuthentication'
import verifyAuthentication from './middlewares/verifyAuthentication'

import { CovidInfo } from "./model/CovidInfo";

import { BaseError } from './Errors';

import { celebrate } from 'celebrate';
import validator from 'cpf-cnpj-validator'
const Joi = require('@hapi/joi').extend(validator)
import multer from 'multer';
import multerConfig from './config/multerConfig'

const routes = Router();
const upload = multer(multerConfig);

// USUARIOS

routes.get("/users/email/:email", userController.verifyEmail);
routes.get("/users/username/:username", userController.verifyUsername);

routes.get("/users", 
	userController.getAll);
routes.get("/users/:id",
	verifyAuthentication,
	userController.getByPk);
routes.post("/users",
	verifyAuthentication, 
	celebrate({
		body: Joi.object().keys({ 
			username: Joi.string().required().regex(/^[a-z0-9_]{4,20}$/),
			password: Joi.string().required().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%&_-]{6,30})$/),
			email: Joi.string().required().email(),
			name: Joi.string().required().regex(/^[a-zá-ùA-ZÁ-Ù ]{4,50}$/),
			type: Joi.number().required().min(0).max(3),
			imageId: Joi.string().max(25).optional().allow(null),
			imageType: Joi.when('imageId', { is: Joi.exist().not(null), then: Joi.string().max(5).required().allow(null) }),
			registerType: Joi.string().valid('crp', 'crf', 'crfa', 'cro', 'coren', 'crm', 'acm', 'ace', 'cpf').required(),
			register: Joi.when('registerType', { is: "cpf", then: Joi.document().cpf()}),
			registerState: Joi.when('registerType', { is: Joi.string().valid('crp', 'crf', 'crfa', 'cro', 'coren', 'crm'), 
				then: Joi.string().required().regex(/^[A-Z]{2}$/), 
				otherwise: null
			})
		})
	}, {
		abortEarly: false
	}), userController.create);
routes.put("/users/:id", 
	ensureAuthentication, 
	celebrate({
		body: Joi.object().keys({ 
			username: Joi.string().regex(/^[a-z0-9_]{4,20}$/),
			password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%&_-]{6,30})$/),
			email: Joi.string().email(),
			name: Joi.string().regex(/^[a-zá-ùA-ZÁ-Ù ]{4,50}$/),
			type: Joi.number().min(0).max(3),
			imageId: Joi.string().max(25).optional().allow(null),
			imageType: Joi.when('imageId', { is: Joi.exist().not(null), then: Joi.string().max(5).required().allow(null) }),
			registerType: Joi.string().valid('crp', 'crf', 'crfa', 'cro', 'coren', 'crm', 'acm', 'ace', 'cpf').required(),
			register: Joi.when('registerType', { is: "cpf", then: Joi.document().cpf()}),
			registerState: Joi.when('registerType', { is: Joi.string().valid('crp', 'crf', 'crfa', 'cro', 'coren', 'crm'), 
				then: Joi.string().required().regex(/^[A-Z]{2}$/), 
				otherwise: null
			})
		})
	}, {
		abortEarly: false
	}),
	userController.edit);
routes.delete("/users/:id", 
	ensureAuthentication, 
	userController.remove);

// TAG
routes.get("/tags", tagController.getAll);
routes.get("/tags/:id", tagController.getByPk);
routes.post("/tags", 
	ensureAuthentication, 
	celebrate({
		body: Joi.object().keys({ 
			description: Joi.string().min(2).max(50).required(),
		})
	}, {
		abortEarly: false
	}),
	tagController.create);
routes.put("/tags/:id", 
	ensureAuthentication, 
	celebrate({
		body: Joi.object().keys({ 
			description: Joi.string().min(2).max(50),
		})
	}, {
		abortEarly: false
	}),
	tagController.edit);
routes.delete("/tags/:id", ensureAuthentication, tagController.remove);

// NOTICIAS
routes.get("/notices", noticeController.getAll.bind(noticeController));
routes.get("/notices/:id",noticeController.getByPk.bind(noticeController));
routes.post("/notices", 
	ensureAuthentication, 
	celebrate({
		body: Joi.object().keys({ 
			title: Joi.string().min(5).max(100).required(),
			abstract: Joi.string().min(5).max(150).required(),
			text: Joi.string().required(),
			tags: Joi.array().items({ id: Joi.number() }),
			imageId: Joi.string().max(25).optional().allow(null),
			imageType: Joi.when('imageId', { is: Joi.exist().not(null), then: Joi.string().max(5).required().allow(null) }),
		})
	}, {
		abortEarly: false
	}),
	noticeController.create.bind(noticeController)
);
routes.put("/notices/:id", 
	ensureAuthentication, 
	celebrate({
		body: Joi.object().keys({ 
			title: Joi.string().min(5).max(100),
			abstract: Joi.string().min(5).max(150),
			text: Joi.string(),
			tags: Joi.array().items({ id: Joi.number() }),
			imageId: Joi.string().max(25).optional().allow(null),
			imageType: Joi.when('imageId', { is: Joi.exist().not(null), then: Joi.string().max(5).required().allow(null) }),
		})
	}, {
		abortEarly: false
	}),
	noticeController.edit.bind(noticeController));
routes.delete("/notices/:id", ensureAuthentication, noticeController.remove.bind(noticeController));

// IMAGEM
routes.post("/images", 
	ensureAuthentication,
	upload.single('image'),
	imageController.create.bind(imageController)
);

// COMENTARIOS
// routes.get("/comments", commentController.getAll);
// routes.get("/comments/:id", commentController.getByPk);
// routes.post("/comments", ensureAuthentication, commentController.create);
// routes.put("/comments/:id", ensureAuthentication, commentController.edit);
// routes.delete("/comments/:id", ensureAuthentication, commentController.remove);

// SESSÕES (LOGIN)
routes.post("/sessions", sessionController.auth);
routes.get("/sessions", ensureAuthentication, sessionController.index);

// REDEFINIR SENHA
routes.post("/recover/:email", accountController.requestAccount);
routes.put("/recover/:uuid",
celebrate({
	body: Joi.object().keys({ 
		password: Joi.string().regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%&_-]{6,30})$/),
		confirmPassword: Joi.string().valid(Joi.ref('password'))
	})
	}, {
		abortEarly: false
	}),
	accountController.redefinePassword);

// COVID (INFO)
routes.get('/covid', async function getInfo (req, res) {
	const query = getConnection().getRepository(CovidInfo);

	//Get the last request saved
	const result = await query.findOne({
		order: {
			date: 'DESC',
		}
	});

	// console.log(result);

	if (result)
		return res.json(result);
	else 
		throw new BaseError('A error ocurred'); 
});

export default routes;
