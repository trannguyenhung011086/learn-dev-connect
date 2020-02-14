const mongoose = require("mongoose");
const Comment = require("../models/comment.model");

module.exports = {
  async addComment({ post, profile, content }) {
    if (!content.text) {
      throw { status: 400, message: "Text is required" };
    }

    const comment = new Comment();
    comment.user = profile.id;
    comment.avatar = profile.avatar;
    comment.post = post._id;
    comment.text = content.text;
    if (content.name) {
      comment.name = content.name;
    }
    const savedComment = await comment.save();

    post.comments.push(savedComment._id);
    await post.save();

    return savedComment;
  },

  async updateComment({ post, profile, update, commentId }) {
    if (!update.text) {
      throw { status: 400, message: "Content is required" };
    }
    if (
      post.comments.filter(
        comment =>
          comment._id.toString() === commentId &&
          comment.user.toString() === profile.id
      ).length === 0
    ) {
      throw { status: 404, message: "Comment not found" };
    }

    const comment = await Comment.findById(
      mongoose.Types.ObjectId(commentId)
    ).exec();
    comment.text = update.text;
    if (update.name) {
      comment.name = update.name;
    }
    return await comment.save();
  },

  async removeComment({ post, profile, commentId }) {
    if (
      post.comments.filter(
        comment =>
          comment._id.toString() === commentId &&
          comment.user.toString() === profile.id
      ).length === 0
    ) {
      throw { status: 404, message: "Comment not found" };
    }

    await Comment.deleteOne({ _id: mongoose.Types.ObjectId(commentId) }).exec();

    const newComments = post.comments.filter(
      comment => comment._id.toString() !== commentId
    );
    post.comments = newComments;
    await post.save();
  }
};
