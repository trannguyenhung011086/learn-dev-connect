const mongoose = require("mongoose");
const Profile = require("../models/profile.model");

module.exports = {
  async getProfile({ userId, profileId }) {
    let id, profile;
    if (userId) {
      id = mongoose.Types.ObjectId(userId);
      profile = await Profile.findOne({ user: id })
        .populate("user", "name email avatar")
        .exec();
    }
    if (profileId) {
      id = mongoose.Types.ObjectId(profileId);
      profile = await Profile.findById(id)
        .populate("user", "name email avatar")
        .exec();
    }
    return profile;
  },

  async getProfiles({ query = {}, page = 1, limit = 10 }) {
    page = parseInt(page);
    limit = parseInt(limit);

    return await Profile.find(query)
      .populate("user", "name email avatar")
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit)
      .exec();
  },

  async createProfile(data) {
    const found = await this.getProfile({ userId: data.user });
    if (found) {
      throw new Error("User already had profile");
    }
    const profile = new Profile(data);
    return await profile.save();
  },

  async updateProfile({ profile, update }) {
    if (update.user && update.user !== profile.user._id.toString()) {
      throw { status: 400, message: "Current user does not match" };
    }
    Object.keys(update).forEach(
      updateField => (profile[updateField] = update[updateField])
    );
    profile.updated = Date.now();
    return await profile.save();
  },

  async deleteProfile(profile) {
    return await Profile.deleteOne({ _id: profile._id }).exec();
  }
};
