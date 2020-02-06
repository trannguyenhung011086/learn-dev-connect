const usersService = require("../services/users.service");

module.exports = {
  async list(req, res, next) {
    try {
      const { page, limit } = req.query;
      const users = await usersService.getUsers({ page, limit });
      res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await usersService.createUser({ name, email, password });
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email
      });
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
