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
  }
};
