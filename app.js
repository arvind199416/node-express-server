require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const chalk = require("cli-color");
// api routes
const userRouter = require("./routes/userRoutes");

const globalErrHandler = require("./controllers/errorControllers");
const AppError = require("./utils/api/appError");

const app = express();

const db = require("./database/connectdb");

// connected to the database
db.connect((err, client) => {
  if (err) {
    console.log(chalk.red("unable to connect to the database!"));
  }

  console.log(chalk.green("database connected"), client);
});

// Allow Cross-Origin requests
app.use(cors());

// Limit request from the same API
const limiter = rateLimit({
  max: 150,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Request from this IP, please try again in an hour",
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "15kb",
  })
);

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use("/api/users", userRouter);

// handle undefined Routes
app.use("*", (req, res, next) => {
  const err = new AppError(404, "fail", "undefined route");
  next(err, req, res, next);
});

app.use(globalErrHandler);

module.exports = app;
exports.chalk = chalk;
