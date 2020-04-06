import App from './App';

import connection from './database/connection';

async function run(): Promise<void> {
    console.log(`Worker process ${process.pid} is running`);
    await connection;
    const app = new App();
    app.start(3333);
}

run();
