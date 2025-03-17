const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const db = new sqlite3.Database(process.env.DB_FILE, (err) => {
  if (err) console.error(err);
  console.log('Connected to SQLite');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nic TEXT UNIQUE,
      name TEXT,
      email TEXT UNIQUE,
      address TEXT,
      gold_holding REAL DEFAULT 0,
      invested_total REAL DEFAULT 0,
      password TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date INTEGER,
      weight REAL,
      price REAL,
      amount REAL,
      type TEXT,
      status TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS withdrawals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      withdraw_transaction_id INTEGER,
      date INTEGER,
      weight REAL,
      status TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (withdraw_transaction_id) REFERENCES transactions(id)
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS gold_prices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date INTEGER,
      price_LKR REAL,
      exchange_rate REAL
    )
  `);
  // db.run(`DROP TABLE IF EXISTS exchange_rate`, (err) => {
  //   if (err) console.error('Error dropping table:', err);
  //   else console.log('Dropped exchange_rate table');
  // }); 
  db.run(`
    CREATE TABLE IF NOT EXISTS exchange_rate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date INTEGER,
    rate REAL
  )
  `);
});

module.exports = db;