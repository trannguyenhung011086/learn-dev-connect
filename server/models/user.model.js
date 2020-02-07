const authHelper = require("../helpers/auth.helper");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: v => /.+@.+\..+/.test(v),
      message: props => `Email ${props.value} is not valid`
    }
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  avatar: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  activated: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (!this.password) {
    throw { status: 400, message: "Password is required" };
  }
  if (this.password.length < 6) {
    throw { status: 400, message: "Password length must be at least 6" };
  }
  this.salt = authHelper.genSalt();
  this.password = authHelper.hashPassword(this.password, this.salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
