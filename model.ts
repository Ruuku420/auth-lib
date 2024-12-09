import { Database } from "jsr:@db/sqlite@0.12";

export const database = new Database("users.db");

database.prepare(
  `
	CREATE TABLE IF NOT EXISTS users (
	  id INTEGER PRIMARY KEY AUTOINCREMENT,
	  username TEXT UNIQUE NOT NULL,
	  password_hash TEXT NOT NULL,
    session TEXT
	);
  `,
).run();

