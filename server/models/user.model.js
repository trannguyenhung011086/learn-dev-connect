const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"]
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
    validate: {
      validator: v => /.+@.+\..+/.test(v),
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password length must be more than 6"]
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

module.exports = mongoose.model("User", UserSchema);
