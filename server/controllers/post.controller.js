const mongoose = require("mongoose");
const postService = require("../services/post.service");

module.exports = {
  async list(req, res, next) {
    try {
      const { page, limit } = req.query;
      const posts = await postService.getPosts({ page, limit });
      res.status(200).json({ data: posts });
    } catch (err) {
      return next(err);
    }
  },

  async listByUserId(req, res, next) {
    try {
      const userId = req.params.userId;
      const { page, limit } = req.query;
      const posts = await postService.getPosts({
        query: { user: mongoose.Types.ObjectId(userId), page, limit }
      });
      res.status(200).json({ data: posts });
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { user, text, name, avatar, likes, comments } = req.body;
      if (user && req.profile.id !== user) {
        throw { status: 400, message: "User does not match" };
      }
      const postData = { user, text, name, avatar, likes, comments };
      const post = await postService.createPost(postData);
      res.status(200).json({ data: post });
    } catch (err) {
      return next(err);
    }
  },

  async postById(req, res, next, id) {
    try {
      const post = await postService.getPost({ postId: id });
      if (!post) {
        throw { status: 404, message: "Post not found" };
      }
      req.post = post;
      next();
    } catch (err) {
      return next(err);
    }
  },

  read(req, res, next) {
    try {
      res.status(200).json({ data: req.post.toObject() });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const newPost = await postService.updatePost({
        post: req.post,
        update: req.body
      });
      res.status(200).json({ data: newPost });
    } catch (err) {
      return next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await postService.deletePost(req.post);
      res.status(200).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  }
};
