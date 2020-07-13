export class BaseError extends Error {
	public statusCode: number;

	constructor(message: string, errName : string = 'baseError') {
		super(message);
		Object.setPrototypeOf(this, BaseError.prototype);
		this.name = errName;	
	}
}

export class Conflict extends BaseError {
	public column: string;
	public data: string;
	constructor(column, data){
		super(`Data conflict`, 'conflictError');
		this.column = column;
		this.data = data;
		Object.setPrototypeOf(this, Conflict.prototype);
		this.statusCode = 409;
	}
}

export class NotFound extends BaseError {
	constructor(){
		super('Not found', 'notFoundError');
		Object.setPrototypeOf(this, NotFound.prototype);
		this.statusCode = 404;
	}
}

export class Forbidden extends BaseError {
	constructor(){
		super("You don't have permission to acess this resource", 'forbiddenError');
		Object.setPrototypeOf(this, Forbidden.prototype);
		this.statusCode = 403;
	}
}

export class Unauthorized extends BaseError {
	constructor(){
		super("You aren’t authenticated, please login or send your token", 'unauthorizedError');
		Object.setPrototypeOf(this, Unauthorized.prototype);
		this.statusCode = 401;
	}
}

export class MissingJWT extends BaseError {
	constructor(){
		super("JWT Token is missing", 'missingJwtError');
		Object.setPrototypeOf(this, MissingJWT.prototype);
		this.statusCode = 400;
	}
}
