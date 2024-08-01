const AppError = require("../utils/api/appError");
const POOL = require("pg").Pool;
const client = new POOL({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

exports.getProfile = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
  res.status(200).json({
    status: "success",
    data: {},
  });
};
exports.createUser = async (req, res, next) => {
  try {
    const { id, email, password, address,active, name } = req.body;
    if (!id || !name || !email || !address || !password || !active) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const query = `
    INSERT INTO users (id, name, email, address, password,active)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`;
   
    const values = [id, name, email, address, password,active];
    console.log(req.body);

    const result = await client.query(query, values);

   
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    next(error); 
  }
};
