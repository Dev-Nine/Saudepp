import * as express from 'express';
import { Application } from 'express';
import Routes  from './routes';

export default class App {
    public app: Application;
    public routes: Routes;

    constructor() {
        this.app = express();
        this.routes = new Routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
    }

    private linkAllRoutes(): void {
        this.routes.defineRoutes();
        this.app.use(this.routes.routes);
    }
    
    public start(port? : number, args? : any): void {
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
    }
}