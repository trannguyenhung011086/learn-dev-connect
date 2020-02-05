const usersService = require("../services/users.service");

module.exports = {
  list(req, res, next) {
    try {
      res.send("TODO");
    } catch (err) {
      return next(err);
    }
  },

  create(req, res, next) {
    try {
      res.send("TODO");
    } catch (err) {
      return next(err);
    }
  },

  async userById(req, res, next, id) {
    try {
      const user = await usersService.getUserById(id);
      if (!user) {
        throw { status: 400, message: "User not found" };
      }
      req.user = user;
      next();
    } catch (err) {
      return next(err);
    }
  },

  read(req, res, next) {
    try {
      const { password, ...user } = req.user.toObject();
      res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  },

  update(req, res, next) {
    try {
      res.send("TODO");
    } catch (err) {
      return next(err);
    }
  },

  delete(req, res, next) {
    try {
      res.send("TODO");
    } catch (err) {
      return next(err);
    }
  }
};
