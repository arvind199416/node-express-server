const jwt = require("jsonwebtoken");
const AppError = require("../utils/api/appError");

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

    // 1) check if email and password exist
    if (!email || !password) {
      return next(
        new AppError(404, "fail", "Please provide email or password"),
        req,
        res,
        next
      );
    }
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
    try {
    //   const user = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm,
    //     role: req.body.role,
    //   });
  
    //   const token = createToken(user.id);
  
    //   user.password = undefined;
  
      res.status(201).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    } catch (err) {
      next(err);
    }
  };
  
