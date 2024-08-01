const validator = require("validator");
const bcrypt = require("bcryptjs");

const userScheme = {
  name: {
    type: "TEXT",
    required: [true, "Please fill your name"],
  },
  email: {
    type: "TEXT",
    required: [true, "Please fill your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, " Please provide a valid email"],
  },
  address: {
    type: "TEXT",
    trim: true,
  },
  password: {
    type: "TEXT",
    required: [true, "Please fill your password"],
    minLength: 6,
    select: false,
  },
  passwordConfirm: {
    type: "TEXT",
    required: [true, "Please fill your password confirm"],
    validate: {
      validator: function (el) {
        // "this" works only on create and save
        return el === this.password;
      },
      message: "Your password and confirmation password are not the same",
    },
  },
  role: {
    type: "TEXT",
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: "BOOLEAN",
    default: true,
    select: false,
  },
};

module.exports = userScheme;
