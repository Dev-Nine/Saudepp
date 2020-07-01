import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
require('dotenv').config();

const connection: Promise<Connection> = createConnection(<ConnectionOptions>{
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "synchronize": false,
    "logging": ["query", "error"],
    "entities": ["src/model/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "cli": {
       "entitiesDir": "src/model",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 });

export default connection;