import { QueryFailedError } from 'typeorm';

import App from './app';
import connection from './database/connection';

connection().then(() => {
    const app = new App();
    app.start();
}).catch(err => {
    console.error(err.message);
    console.error('Unable to initialize because a error in the connection!');
    if (err instanceof QueryFailedError) 
	console.error('There is a error on the typeorm query!');

    process.exit(1);
});

