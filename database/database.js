const userScheme = require("../models/userModel");

const POOL = require("pg").Pool;

const client = new POOL({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

client.connect((err, client, release) => {
  if (err) {
    return console.error(err);
  }
  client.query(createTableQuery, (err, result) => {
    release();
  });
});
