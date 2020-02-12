const jwt = require("jsonwebtoken");
const config = require("../config");
const authHelper = require("../helpers/auth.helper");
const usersService = require("../services/users.service");

module.exports = {
  async verifyUser({ email, password }) {
    const user = await usersService.getUserByEmail(email);
    if (!user) {
      throw { status: 400, message: "User does not exist" };
    }
    const check = authHelper.verifyPassword(password, user.password, user.salt);
    if (check === false) {
      throw { status: 400, message: "Email or Password does not match" };
    }
    return user;
  },

  grantToken(payload) {
    if (!payload) {
      throw { status: 400, message: "Payload is required" };
    }
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpire });
  },

  verifyToken(token) {
    if (!token) {
      throw { status: 400, message: "Token is required" };
    }
    return jwt.verify(token, config.jwtSecret);
  },

  getTokenFromHeaders(headers) {
    let token = "";
    if (headers.authorization && headers.authorization.startsWith("Bearer")) {
      token = headers.authorization.replace("Bearer ", "");
    }
    if (!token) {
      throw { status: 401, message: "Token is missing" };
    }
    return token;
  }
};
