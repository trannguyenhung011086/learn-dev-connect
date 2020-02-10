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
      user.password = undefined;
      user.salt = undefined;
      req.user = user;
      next();
    } catch (err) {
      return next(err);
    }
  },

  read(req, res, next) {
    try {
      const { password, salt, ...user } = req.user.toObject();
      res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { name, password } = req.body;
      const user = await usersService.updateUser({
        user: req.user,
        update: { name, password }
      });
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email
      });
    } catch (err) {
      return next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await usersService.deleteUser(req.user);
      res.status(200).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  }
};
