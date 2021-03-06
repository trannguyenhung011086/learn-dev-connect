const authService = require("../services/auth.service");

module.exports = {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.verifyUser({ email, password });

      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      };
      const token = authService.grantToken(payload);

      res.status(200).json({ ...payload, token });
    } catch (err) {
      return next(err);
    }
  },

  logout(req, res, next) {
    try {
      res.send("todo with redis blacklist method");
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
  },

  async isLoggedIn(req, res, next) {
    try {
      const token = authService.getTokenFromHeaders(req.headers);
      await authService.checkBlacklistToken(token);

      const decoded = authService.verifyToken(token);
      req.profile = decoded;
      req.profile.token = token;

      next();
    } catch (err) {
      return next(err);
    }
  },

  isCurrentUser(req, res, next) {
    if (req.user && req.profile.id !== req.user._id.toString()) {
      throw { status: 403, message: "Current user does not match" };
    }
    if (
      req.profileData &&
      req.profile.id !== req.profileData.user._id.toString()
    ) {
      throw { status: 403, message: "Current user does not match profile" };
    }
    next();
  }
};
