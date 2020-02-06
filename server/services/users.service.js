const User = require("../models/user.model");

module.exports = {
  async getUserById(id) {
    return await User.findById(id);
  },

  async getUsers({ query = {}, page = 1, limit = 10 }) {
    page = parseInt(page);
    limit = parseInt(limit);

    const users = await User.find(query)
      .select("-password")
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
    const user = new User(data);
    return await user.save();
  }
};
