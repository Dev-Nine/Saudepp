import { Application } from 'express';
import { QueryFailedError } from 'typeorm';
import { scheduleJob } from 'node-schedule';
import * as express from 'express';
const cors = require('cors');

import Routes  from './routes';
import connection from './database/connection';
import workerCovidInfo from './services/workerCovidInfo';

export default class App {
    public app: Application;
    public routes: Routes;

    constructor() {
        this.app = express();
    }

    private middlewares(): void {
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
    
    public async start(port? : number, args? : any): Promise<void> {
        try {
            const con = await connection;
            
            this.middlewares();
            this.linkAllRoutes();
            this.workers();

            // Para inserir a informação sobre o corona quando iniciar o sistema
            await workerCovidInfo();
    
            if (port) {
                if (args) {
                    this.app.listen(port, args, () => console.log(`App running on port ${port}`));
                } else {
                    this.app.listen(port, () => console.log(`App running on port ${port}`));
                }
            } else {
                this.app.listen(() => console.log(`Port was not specified, running app`));
            }
            console.log('App is online!');
        } catch (err) {
            console.log(err.message);
            console.error('Unable to initiate the app!');
            if (err instanceof QueryFailedError) {
                console.error('There is a error on the typeorm query!');
            }
        }

    }
}