const mongoose = require("mongoose");
const Post = require("../models/post.model");

module.exports = {
  async getPost({ postId, userId }) {
    let id, post;
    if (postId) {
      id = mongoose.Types.ObjectId(postId);
      post = await Post.findById(id)
        .populate("user", "name email avatar")
        .exec();
    }
    if (userId) {
      id = mongoose.Types.ObjectId(postId);
      post = await Post.findOne({ user: id })
        .populate("user", "name email avatar")
        .exec();
    }
    return post;
  },

  async getPosts({ query = {}, page = 1, limit = 10 }) {
    page = parseInt(page);
    limit = parseInt(limit);

    return await Post.find(query)
      .populate("user", "name email avatar")
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit)
      .exec();
  },

  async createPost(data) {
    const post = new Post(data);
    return await post.save();
  },

  async updatePost({ post, update }) {
    if (update.user && update.user !== post.user._id.toString()) {
      throw { status: 400, message: "Current user does not match" };
    }
    Object.keys(update).forEach(
      updateField => (post[updateField] = update[updateField])
    );
    post.updated = Date.now();
    return await post.save();
  },

  async deletePost(post) {
    return await Post.deleteOne({ _id: post._id }).exec();
  }
};
