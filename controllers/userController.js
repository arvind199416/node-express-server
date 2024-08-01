const pool = require("../database/connectdb");
const AppError = require("../utils/api/appError");


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

    const result = await pool.query(query, values);

   
    res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (error) {
    next(error); 
  }
};
