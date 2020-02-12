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

  async createProfile(data) {
    const found = await this.getProfile({ userId: data.user });
    if (found) {
      throw new Error("User already had profile");
    }
    const profile = new Profile(data);
    return await profile.save();
  },

  async updateProfile({ profile, update }) {
    Object.keys(update).forEach(
      updateField => (profile[updateField] = update[updateField])
    );
    return await profile.save();
  },

  async deleteProfile(profile) {
    return await Profile.deleteOne({ _id: profile._id }).exec();
  }
};
