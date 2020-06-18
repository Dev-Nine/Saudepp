import BaseError from './BaseError';

export default class NotFound extends BaseError {
    constructor(){
	super('Not found');
	this.statusCode = 404;
    }
}
