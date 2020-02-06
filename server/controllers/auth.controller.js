const authService = require("../services/auth.service");

module.exports = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.verifyUser({ email, password });

      // imlement JWT

      res.status(200).json({ id: user._id });
    } catch (err) {
      return next(err);
    }
  },

  logout(req, res, next) {
    try {
      res.send("todo");
    } catch (err) {
      return next(err);
    }
  },

  activate(req, res, next) {
    try {
      res.send("todo");
    } catch (err) {
      return next(err);
    }
  }
};
