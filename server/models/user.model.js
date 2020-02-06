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
    validate: {
      validator: v => /.+@.+\..+/.test(v),
      message: props => `Email ${props.value} is not valid`
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
