import App from './App';

import connection from './database/connection';

async function run(): Promise<void> {
    const conn = await connection;
    const app = new App();
    app.start(3333);
}

run();
