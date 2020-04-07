import * as express from 'express';
import { Application } from 'express';
import routes from './routes';

export default class App {
    public app: Application;

    constructor() {
        this.app = express();
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use(routes)
    }
    
    public start(port? : number, args? : any): void {
        this.middlewares();
        this.routes();

        if (port) {
            if (args) {
                this.app.listen(port, args);
            } else {
                this.app.listen(port);
            }
        }else {
            this.app.listen();
        }
        console.log('App is online!');
    }
}