import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
require('dotenv').config();

export default async function connection() {
	return createConnection({
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
} 

