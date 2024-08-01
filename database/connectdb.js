const userScheme = require("../models/userModel");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;


// pool.connect((err, client, release) => {
//   if (err) {
//     console.error(err);
//     return err;
//   }

//   client.query("SELECT NOW()", (err, result) => {
//     release();
//     if (err) {
//       return console.error("Error executing query");
//     } else {
//       console.log("====================================");
//       console.log("Connected to database");
//       console.log("====================================");
//     }
//   });
// });
