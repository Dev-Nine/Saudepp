
export default class BaseError extends Error {
    public statusCode: number;
    
    constructor(message: string) {
        super(message);
    }
}
