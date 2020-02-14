const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"]
  },
  text: {
    type: String,
    required: [true, "Text is required"]
  },
  name: String,
  avatar: String,
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

PostSchema.virtual("likesCount").get(function() {
  return this.likes.length;
});

PostSchema.virtual("commentsCount").get(function() {
  return this.comments.length;
});

PostSchema.set("toObject", { getters: true });
PostSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Post", PostSchema);
