import 'reflect-metadata';
import { createConnection } from 'typeorm';
require('dotenv').config();

export default async function connection() {
	return createConnection({
		"type": "postgres",
		"url": process.env.DATABASE_URL,
		"synchronize": false,
		"logging": ["query", "error"],
		"entities": [process.env.TYPEORM_ENTITIES],
		"migrations": [process.env.TYPEORM_MIGRATIONS],
		"subscribers": [process.env.TYPEORM_SUBSCRIBERS],
		"cli": {
			"entitiesDir": process.env.TYPEORM_ENTITIES_DIR,
			"migrationsDir": process.env.TYPEORM_MIGRATIONS_DIR,
			"subscribersDir": process.env.TYPEORM_SUBSCRIBERS_DIR
		}
	});
} 

