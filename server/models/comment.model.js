const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "Post is required"]
  },
  text: {
    type: String,
    require: [true, "Text is required"]
  },
  name: String,
  avatar: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
