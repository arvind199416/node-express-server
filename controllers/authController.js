const jwt = require("jsonwebtoken");
const AppError = require("../utils/api/appError");
const pool = require("../database/connectdb");

const User = require("../models/userModel");
const { insertData, createTable } = require("../utils/functions");

const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!pool) {
      return next(new AppError(500, "fail", "database not connected"));
    }
    // 1) check if email and password exist
    if (!email || !password) {
      return next(
        new AppError(404, "fail", "Please provide email or password"),
        req,
        res,
        next
      );
    }

    const isUserExist = await pool.query(`SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE  table_schema = 'dark'
    AND    table_name   = 'users'
    );`);

    if (!isUserExist.rows[0].exists) {
      return next(
        new AppError(404, "fail", "user does not exist."),
        req,
        res,
        next
      );
    }

    const token = createToken(8);

    res.status(200).json({
      status: "success",
      code: 200,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (User.email.validate(email) && req.body.password) {
      const body = Object.values(req.body);

      const validateField = `SELECT EXISTS (
          SELECT 1
          FROM users
          WHERE email = ${email}
      )`;

      const validateTable = await pool.query(`SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'dark'
        AND    table_name   = 'users'
        );`);
      console.log(validateTable.rows[0].exists);
      if (!validateTable.rows[0].exists) {
        try {
          createTable(pool, User, "users");
          // insertData(pool, ["email", "password"], body, "users").then(
          //   (data) => {
          //     console.log("line 82 ", data);
          //     res.status(201).json({
          //       status: "success",
          //       code: 201,
          //       message: `user created with ${email}.`,
          //     });
          //   }
          // );
          res.status(201).json({
                  status: "success",
                  code: 201,
                  message: `user created with ${email}.`,
                });
        } catch (error) {
          next(error);
        }
      } else {
        const isEmailExits = pool.query(validateField);
        if (isEmailExits) {
          res.status(200).json({
            status: "success",
            code: 200,
            message: "user with this email already exists.",
          });
          console.log(isEmailExits);
        } else {
          insertData(pool, ["email", "password"], body, "users").then(
            (data) => {
              console.log("line 82 ", data);
              res.status(201).json({
                status: "success",
                code: 201,
                message: `user created with ${email}.`,
              });
            }
          );
        }
      }
    } else {
      res.status(400).json({
        status: "failed",
        code: 400,
        message: "request body is missing one or more parameter",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) check if the token is there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError(
          401,
          "fail",
          "You are not logged in! Please login in to continue"
        ),
        req,
        res,
        next
      );
    }

    // 2) Verify token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) check if the user is exist (not deleted)
    const user = await User.findById(decode.id);
    if (!user) {
      return next(
        new AppError(401, "fail", "This user is no longer exist"),
        req,
        res,
        next
      );
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// Authorization check if the user have rights to do this action
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "fail", "You are not allowed to do this action"),
        req,
        res,
        next
      );
    }
    next();
  };
};
