const mongoose = require("mongoose");
const Post = require("../models/post.model");

module.exports = {
  async getPost({ postId, userId }) {
    let id, post;
    if (postId) {
      id = mongoose.Types.ObjectId(postId);
      post = await Post.findById(id)
        .populate("user", "name email avatar")
        .populate("comments", "user avatar text name created updated")
        .exec();
    }
    if (userId) {
      id = mongoose.Types.ObjectId(postId);
      post = await Post.findOne({ user: id })
        .populate("user", "name email avatar")
        .populate("comments", "user avatar text name created updated")
        .exec();
    }
    return post;
  },

  async getPosts({ query = {}, page = 1, limit = 10 }) {
    page = parseInt(page);
    limit = parseInt(limit);

    return await Post.find(query)
      .populate("user", "name email avatar")
      .populate("comments", "user avatar text name created updated")
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit)
      .exec();
  },

  async createPost({ postData, profile }) {
    if (!postData.text) {
      throw { status: 400, message: "Text is required" };
    }
    const post = new Post();
    post.user = profile.id;
    post.avatar = profile.avatar;
    post.text = postData.text;
    post.name = postData.name;
    return await post.save();
  },

  async updatePost({ post, update, profile }) {
    if (!update.text) {
      throw { status: 400, message: "Text is required" };
    }
    if (profile.id !== post.user._id.toString()) {
      throw { status: 400, message: "User does not own this post" };
    }

    post.text = update.text;
    if (update.name) {
      post.name = update.name;
    }
    post.updated = Date.now();
    return await post.save();
  },

  async addLike({ post, profile }) {
    if (
      post.likes.filter(like => like.user.toString() === profile.id).length > 0
    ) {
      throw { status: 400, message: "User already liked this post" };
    }
    const originalCount = post.likesCount;
    post.likes.push({ user: post.user._id });
    const updated = await post.save();
    return { originalCount, newCount: updated.likesCount };
  },

  async removeLike({ post, profile }) {
    if (
      post.likes.filter(like => like.user.toString() === profile.id).length ===
      0
    ) {
      throw { status: 400, message: "User did not like this post" };
    }
    const originalCount = post.likesCount;
    const newLikes = post.likes.filter(
      like => like.user.toString() !== profile.id
    );
    post.likes = newLikes;
    const updated = await post.save();
    return { originalCount, newCount: updated.likesCount };
  },

  async deletePost({ post, profile }) {
    if (profile.id !== post.user._id.toString()) {
      throw { status: 400, message: "User does not own this post" };
    }
    return await Post.deleteOne({ _id: post._id }).exec();
  }
};
