import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { BaseError } from '../Errors';

export default function (err: Error | BaseError, req: Request, res: Response, next: Function) {    
    // Se estiver em ambiente de desenvolvimento e o erro não for uma instancia de NotFound
    if (process.env.DEV && !(err.name != BaseError.name)) {
	console.error(err.stack);
	console.error(err.message);  
    }

    if (err instanceof QueryFailedError) {
	if (process.env.DEV) {
	    console.error(err['detail']);
	    console.error(err['code']);
	}

	if (Number(err['code']) === 23505) {
	    let detail = err['detail'].split('=')[0];
	    detail = detail.split(' ')[1];
	    detail = detail.replace('(', '');
	    detail = detail.replace(')', '');
	    //[1].replace(['(', ']'], ' ');	    
	    err.message = `This ${detail} is already registered`;
	}
    }

    res.status((err instanceof BaseError)? err.statusCode : 400);
	return res.send({
	    error: err.message,
	});
}
