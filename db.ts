import sqlite3 from "sqlite3";
const dbPath = process.env.DB_PATH || "mydatabase.db";
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender INTEGER,
      recipient INTEGER,
      type TEXT,
      text TEXT,
      url TEXT,
      height INTEGER,
      width INTEGER,
      source TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db;
