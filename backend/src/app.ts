import * as express from 'express';
import { Application } from 'express';
import Routes  from './routes';

import connection from './database/connection';
import { QueryFailedError } from 'typeorm';

export default class App {
    public app: Application;
    public routes: Routes;

    constructor() {
        this.app = express();
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private linkAllRoutes(): void {
        this.routes = new Routes();
        this.routes.defineRoutes();
        this.app.use(this.routes.routes);
    }
    
    public async start(port? : number, args? : any): Promise<void> {
        try {
            const con = await connection;
            
            this.middlewares();
            this.linkAllRoutes();
    
            if (port) {
                if (args) {
                    this.app.listen(port, args);
                } else {
                    this.app.listen(port);
                }
            } else {
                this.app.listen();
            }
            console.log('App is online!');
        } catch (err) {
            console.error('Unaple to initiate the app!');
            if (err instanceof QueryFailedError) {
                console.error('There is a error on the typeorm query!');
            }
        }

    }
}