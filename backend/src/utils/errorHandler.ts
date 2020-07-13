import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { BaseError } from '../Errors';

export default function (err: BaseError | Error, req: Request, res: Response, next: Function) {    
	let status: number = 400;

	// Se estiver em ambiente de desenvolvimento e o erro não for uma instancia de NotFound
	const isBaseError = err instanceof BaseError;
	console.log(isBaseError);

	// Se nao for um BaseError
	if (!isBaseError) {
		if (process.env.DEV) {
			console.error(err.stack);
			console.error(err.message);  
		}

		// Se for um erro do typeorm
		if (err instanceof QueryFailedError) {
			// Err status 23505 representa que ocorreu conflito de chave primaria no DB
			if (Number(err['code']) === 23505) {
				let detail = err['detail'].split('=')[0];
				detail = detail.split(' ')[1];
				detail = detail.replace('(', '');
				detail = detail.replace(')', '');
				//[1].replace(['(', ']'], ' ');	    
				err.message = `This ${detail} is already registered`;
				
				// Codigo http para conflito de chave primaria
				status = 409;
			}
		}
	} else {
		// Se for um BaseError, realize um cast e armazene o statusCode
		
		status = (<BaseError>err).statusCode;	
	}

	delete err.stack;
	return res.status(status).send({
	    ...err, message: err.message,
	});
}
