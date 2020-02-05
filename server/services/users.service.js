const User = require("../models/user.model");

module.exports = {
  async getUserById(id) {
    return await User.findById(id);
  }
};
