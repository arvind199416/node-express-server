const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER_NAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error(err);
    return err;
  }

  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query");
    } else {
      console.log("====================================");
      console.log("Connected to database");
      console.log("====================================");
    }
  });
});
