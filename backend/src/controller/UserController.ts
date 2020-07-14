import { getRepository, Raw } from "typeorm";
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../model/User';
import imgurApi, { config } from '../utils/imgurApi'
import * as escape from 'pg-escape'

import { Forbidden, NotFound, Conflict } from '../Errors';

// unused
//import { validate } from 'class-validator';
//import { resolveSoa } from "dns";

export async function validateCreate(req : Request): Promise<void>{
	// if (!req.body.password || !(req.body.password.length >= 6))
	//     throw Error('Password length must be 6 or more characters');

	// por enquanto isso é valido somente nessa fase de testes
	if(req.body.type == UserRole.ADMIN)
		return;

	throw new Forbidden;

	/* codigo abaixo quando tiver usuario comum
	
	// usuario adm nao pode ser criado por qualquer usuario
	// usuario "mod" nao é criado diretamente, é transformado de um usuario existente
	// if(req.body.type == UserRole.ADMIN || req.body.type == UserRole.MODERADOR)
	//     return 403;

	// permissoes de usuario nao autenticado
	if(!req.user){
		// if(req.body.type == UserRole.COMUM)
		//     return 200;
		throw Forbidden;
	}

	// somente usuario adm pode criar profissionais
	if(req.user.type != UserRole.ADMIN && req.body.type == UserRole.PROFISSIONAL)
		throw Forbidden;

	return 200;
	*/
}

export async function validateEdit(req : Request): Promise<void>{
	const editedUser : User = await getRepository(User).findOne(req.params.id);

	// o proprio usuario pode alterar sua conta, entrentanto:
	// nao pode alterar o seu tipo
	if(req.user.id == req.params.id){
		if(req.body.type && req.body.type != req.user.type)
			throw new Forbidden;
		return;
	}

	// jamais editar um usuario para se tornar adm
	if(req.body.type == UserRole.ADMIN)
		throw new Forbidden;

	// se for um usuario adm logado
	if(req.body.type) {
		if(req.user.type == UserRole.ADMIN){
			// profissional nao é editado, mas sim criado
			if(req.body.type == UserRole.PROFISSIONAL || editedUser.type == UserRole.PROFISSIONAL)
				throw new Forbidden;
			// else if(editedUser.type == UserRole.MODERADOR || editedUser.type == UserRole.COMUM)
			//     return 200;
		}
	}
		
	throw new Forbidden;
}

export async function validateDelete(req : Request): Promise<void>{
	const deletedUser : User = await getRepository(User).findOne(req.params.id);

	// o proprio usuario pode excluir sua conta
	if(req.user.id == req.params.id)
		return;

	// adm pode excluir a conta de qualquer um
	// exceto outros adms lol
	if(req.user.type == UserRole.ADMIN && deletedUser.type != UserRole.ADMIN)
		return;

	throw new Forbidden;
}

export async function processCreateData(req : Request): Promise<User> {
	const user = new User;
	const body = req["body"];

	user.name = body.name;
	user.email = body.email;
	user.password = body.password;
	user.username = body.username;
	user.identifier = body.identifier;
	user.identifierType = body.identifierType;
	user.type = body.type;

	if(body.imageId){
		user.imageId = body.imageId;
		user.imageType = body.imageType;
		user.deleteHash = body.deleteHash;
	}

	return user;
}

export async function processEditData(req : Request): Promise<User> {
	const user = new User;
	const body = req["body"];

	user.name = body.name;
	user.email = body.email;
	user.password = body.password;
	user.username = body.username;
	user.identifier = body.identifier;
	user.identifierType = body.identifierType;
	user.type = body.type;

	if(body.imageId){
		user.imageId = body.imageId;
		user.imageType = body.imageType;
		user.deleteHash = body.deleteHash;
	}else if(body.imageId === null){
		user.imageId = null;
		user.imageType = null;
		user.deleteHash = null;
	}

	return user;
}

export async function getAll(req : Request, res : Response, next) : Promise<Response> {
	let options;
	try{
		let limit = 8; // default
		if(req.query["limit"])
			limit = Number(req.query["limit"]);
		if(req.query["page"]){
			const page = Number(req.query["page"]);
			options = {order: {id : "ASC"}, take: limit, skip: (limit * page)};
		}

		// searchable attributes:
		// name
		// identifier
		let queryName;
		if(req.query["name"])
			queryName = "name"
		else if(req.query["identifier"])
			queryName = "identifier"
		if(queryName){
			const attribute = String(req.query[queryName]).toLocaleLowerCase();
			const query = escape(`ILIKE %L`, `%${attribute}%`)
			options = {...options, where: 
				{[queryName]: Raw(alias => `LOWER(${alias}) ${query}`)}
			}
		}
		const users = await getRepository(User).find(options);
		if(users && users.length > 0)
			return res.json(users);
		
		return next(new NotFound);
	} catch(err){
		return next(err);
	}
}

export async function getByPk(req : Request, res : Response, next) : Promise<Response> {
	const user = await getRepository(User).findOne(req.params["id"], {
		select: [
			"id", 
			"name", 
			"email", 
			"username", 
			"type",
			"imageId",
			"imageType",
			"identifierType",
			"identifier"
		]});
	if(user){
		if(!req.user || (req.user.type != 0 && parseInt(req.user.id) != user.id)){
			delete user.email;
			delete user.username;
			delete user.identifier;
			delete user.identifierType;
		}
		return res.json(user);
	}
		
	
	return next(new NotFound);
}

export async function create(req : Request, res : Response, next: Function) : Promise<Response>{
	try{           
	await validateCreate(req);

		req["body"].password = await bcrypt.hash(req["body"].password, 8);

		const user: User = await processCreateData(req);

		const result: User[] = await getRepository(User).save([user]);
		delete result[0].id;
		delete result[0].password;
		delete result[0].deleteHash;
		return res.json(result);

	}catch(err){	
		return next(err);
		//return res.status(400).send();
	}
}

export async function edit(req : Request, res : Response, next): Promise<Response> {
	try{
		await validateEdit(req);
		
		if(req["body"].password !== undefined)
			req["body"].password = await bcrypt.hash(req["body"].password, 8);

		const user: User = await processEditData(req);

		//const errors = await validate(user);
		//if (errors)
		//    return res.status(400).json({ error: errors})

		const foundUser = await getRepository(User).findOne(
		req.params["id"], {
		select: [
			"id", 
			"imageId", 
			"deleteHash"
		]});
		
		if (foundUser) {
			if (foundUser.imageId && (foundUser.imageId !== user.imageId || user.imageId === null)){
				try{
					await imgurApi.delete(`image/${foundUser.deleteHash}`, config)
				} catch(err) {
					console.log("Error deleting the image...")
					return next(err);
				}
			}
			getRepository(User).merge(foundUser, user);

			const result = await getRepository(User).save(foundUser);
			delete result.id;
			delete result.password;
			delete result.deleteHash;

			return res.json(result);
		}
		throw new NotFound;
	}catch(err){
		return next(err);
}
}

export async function remove(req : Request, res : Response, next): Promise<Response> {
	try{
		await validateDelete(req);
		const user = await getRepository(User).findOne(req.params["id"], {
			select: [
				"id", 
				"imageId",
				"deleteHash",
			]});
		if(user){
			if (user.imageId){
				try{
					await imgurApi.delete(`image/${user.deleteHash}`, config)
				} catch(err) {
					console.error("Error deleting the image...")
					return next(err);
				}
			}    
			await getRepository(User).delete(req.params["id"]);
			return res.status(200).send();
		}else{
			throw new NotFound();
		}
	}catch(err){
		return next(err);
	}
}

export async function verifyEmail(req : Request, res : Response, next) : Promise<Response> {
	const user = await getRepository(User)
		.createQueryBuilder("user")
		.where(`user.email = '${req.params["email"]}'`)
		.getOne()
	if(user)
		return next(new Conflict('email', req.params["email"]))
	return res.status(204).send()
}

export async function verifyUsername(req : Request, res : Response, next) : Promise<Response> {
	const user = await getRepository(User)
		.createQueryBuilder("user")
		.where(`user.username = '${req.params["username"]}'`)
		.getOne()
	if(user)
	return next(new Conflict('username', req.params["username"]))
	return res.status(204).send()
}