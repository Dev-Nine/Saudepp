import { Application, Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { scheduleJob } from 'node-schedule';
import * as express from 'express';
import * as cors from 'cors';

import Routes  from './routes';
import connection from './database/connection';
import workerCovidInfo from './services/workerCovidInfo';

import { Errors } from './Errors';

export default class App {
    public app: Application;
    public routes: Routes;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
        
        // n faz sentido colocar aqui, se não nunca irão conseguir fazer login
        // this.app.use(ensureAuthentication)
    }

    private workers(): void {
        //second minute hour day-of-month month day-of-week
        scheduleJob('0 0 * * * *', workerCovidInfo);
    }

    private linkAllRoutes(): void {
        this.routes = new Routes();
        this.routes.defineRoutes();
        this.app.use(this.routes.routes);
    }

    private initializeErrorsHandler() {
        this.app.use(function (err: Error | Errors.BaseError, req: Request, res: Response, next: Function) {    
        // Se estiver em ambiente de desenvolvimento e o erro não for uma instancia de NotFound
        if (process.env.DEV && !(err.constructor == Errors.NotFound.constructor)) {
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

        res.status((err instanceof Errors.BaseError)? err.statusCode : 400);
            return res.send({
                error: err.message,
            });
        });
    }
    
    public async start(args? : any): Promise<void> {
        /*
	 *  Initialize the express micro-service
	 */ 
        try {           
            const port = Number(process.env.PORT) || 3333;

            const con = await connection;

            this.linkAllRoutes();
            this.initializeErrorsHandler();
            this.workers();
            
        // Para inserir a informação sobre o corona quando iniciar o sistema
            await workerCovidInfo();

            if (args) {
            this.app.listen(port, args, () => console.log(`App running on port ${port}`));
            } else {
                this.app.listen(port, () => console.log(`App running on port ${port}`));
            }
            console.log('App is online!');
        } catch (err) {
            console.error(err.message);
            console.error('Unable to initiate the app!');
            if (err instanceof QueryFailedError) {
                console.error('There is a error on the typeorm query!');
            } 
            process.exit(1);
        }
    }
}
