const User = require("../models/user.model");
const authHelper = require("../helpers/auth.helper");

module.exports = {
  async getUserById(id) {
    return await User.findById(id).exec();
  },

  async getUserByEmail(email) {
    return await User.findOne({ email }).exec();
  },

  async getUsers({ query = {}, page = 1, limit = 10 }) {
    page = parseInt(page);
    limit = parseInt(limit);

    const users = await User.find(query)
      .select("-password -salt")
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit)
      .sort({ name: 1 })
      .exec();
    const total = await User.countDocuments(query).exec();

    return {
      page,
      limit,
      total,
      data: users
    };
  },

  async createUser(data) {
    const { email } = data;
    const avatar = await authHelper.genAvatar({ email });
    const user = new User(data);
    user.avatar = avatar;
    return await user.save();
  },

  async updateUser({ user, update }) {
    if (update.name) {
      user.name = update.name;
    }
    if (update.password) {
      user.password = update.password;
    }
    user.updated = Date.now();
    return await user.save();
  },

  async deleteUser(user) {
    await User.deleteOne({ _id: user._id }).exec();
  }
};
