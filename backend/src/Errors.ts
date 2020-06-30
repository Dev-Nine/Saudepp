export namespace Errors {
    export class BaseError extends Error {
		public statusCode: number;
	
		constructor(message: string) {
		    super(message);
		    this.name = 'baseError';	
		}
    }

    export class NotFound extends BaseError {
	constructor(){
	    super('Not found');
	    this.statusCode = 404;
	}
    }

    export class Forbidden extends BaseError {
	constructor(){
	    super("You don't have permission to acess this resource");
	    this.statusCode = 403;
	}
    }

    export class Unauthorized extends BaseError {
	constructor(){
	    super("You aren’t authenticated, please login or send your token");
	    this.statusCode = 401;
	}
    }

    export class MissingJWT extends BaseError {
	constructor(){
	    super("JWT Token is missing");
	    this.statusCode = 400;
	}
    }
}
