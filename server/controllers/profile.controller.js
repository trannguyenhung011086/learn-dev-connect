const profileService = require("../services/profile.service.js");

module.exports = {
  async current(req, res, next) {
    try {
      const profile = await profileService.getProfile({
        userId: req.profile.id
      });
      if (!profile) {
        throw { status: 400, message: "User has no profile" };
      }
      res.status(200).json(profile);
    } catch (err) {
      return next(err);
    }
  },

  async list(req, res, next) {
    try {
      const { page, limit } = req.query;
      const profiles = await profileService.getProfiles({ page, limit });
      res.status(200).json({ data: profiles });
    } catch (err) {
      return next(err);
    }
  },

  async create(req, res, next) {
    try {
      const {
        user,
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubUsername,
        experience,
        education,
        social
      } = req.body;

      if (user && req.profile.id !== user) {
        throw { status: 400, message: "User does not match" };
      }

      const profileData = {
        user,
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubUsername,
        experience,
        education,
        social
      };

      const profile = await profileService.createProfile(profileData);
      res.status(200).json({ data: profile });
    } catch (err) {
      return next(err);
    }
  },

  async profileById(req, res, next, id) {
    try {
      const profile = await profileService.getProfile({ profileId: id });
      if (!profile) {
        throw { status: 404, message: "Profile not found" };
      }
      req.profileData = profile;
      next();
    } catch (err) {
      return next(err);
    }
  },

  async profileByUserId(req, res, next, id) {
    try {
      const profile = await profileService.getProfile({ userId: id });
      req.profileData = profile;
      next();
    } catch (err) {
      return next(err);
    }
  },

  read(req, res, next) {
    try {
      res
        .status(200)
        .json({
          data: req.profileData
            ? req.profileData.toObject()
            : "User has no profile"
        });
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const newProfile = await profileService.updateProfile({
        profile: req.profileData,
        update: req.body
      });
      res.status(200).json({ data: newProfile });
    } catch (err) {
      return next(err);
    }
  },

  async delete(req, res, next) {
    try {
      await profileService.deleteProfile(req.profileData);
      res.status(200).json({ deleted: true });
    } catch (err) {
      return next(err);
    }
  }
};
