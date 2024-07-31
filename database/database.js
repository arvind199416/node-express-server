const POOL = require("pg").Pool;

const client = new POOL({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});
const createTableQuery = `
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  address VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT TRUE
);
  `;
client.connect((err, client, release) => {
  if (err) {
    return console.error(err);
  }
  client.query(createTableQuery, (err, result) => {
    release();
  });
});
