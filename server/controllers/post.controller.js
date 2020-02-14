const mongoose = require("mongoose");
const postService = require("../services/post.service");
const commentService = require("../services/comment.service");

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
      const { text, name } = req.body;
      const post = await postService.createPost({
        postData: { text, name },
        profile: req.profile
      });
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
      const { text, name } = req.body;
      const newPost = await postService.updatePost({
        post: req.post,
        update: { text, name },
        profile: req.profile
      });
      res.status(200).json({ data: newPost });
    } catch (err) {
      return next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await postService.deletePost({ post: req.post, profile: req.profile });
      res.status(200).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  },

  async like(req, res, next) {
    try {
      const data = await postService.addLike({
        post: req.post,
        profile: req.profile
      });
      res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async unlike(req, res, next) {
    try {
      const data = await postService.removeLike({
        post: req.post,
        profile: req.profile
      });
      res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async comment(req, res, next) {
    try {
      const { text, name } = req.body;
      const data = await commentService.addComment({
        post: req.post,
        profile: req.profile,
        content: { text, name }
      });
      res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  },

  async removeComment(req, res, next) {
    try {
      await commentService.removeComment({
        post: req.post,
        profile: req.profile,
        commentId: req.params.commentId
      });
      res.status(200).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  },

  async modifyComment(req, res, next) {
    try {
      const { text, name } = req.body;
      const data = await commentService.updateComment({
        post: req.post,
        profile: req.profile,
        commentId: req.params.commentId,
        update: { text, name }
      });
      res.status(200).json(data);
    } catch (err) {
      return next(err);
    }
  }
};
