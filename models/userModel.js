const validator = require("validator");
const bcrypt = require("bcryptjs");

const userScheme = {
  name: {
    type: String,
    required: [true, "Please fill your name"],
  },
  email: {
    type: String,
    required: [true, "Please fill your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, " Please provide a valid email"],
  },
  address: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please fill your password"],
    minLength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
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
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
};
