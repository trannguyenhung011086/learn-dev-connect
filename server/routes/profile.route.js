const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile.controller.js");
const { isLoggedIn, isCurrentUser } = require("../controllers/auth.controller");

router.get("/me", isLoggedIn, profileController.current);

router
  .route("/")
  .get(profileController.list)
  .post(isLoggedIn, profileController.create);

router
  .route("/:profileId")
  .get(isLoggedIn, profileController.read)
  .put(isLoggedIn, isCurrentUser, profileController.update)
  .delete(isLoggedIn, isCurrentUser, profileController.delete);

router.param("profileId", profileController.profileById);

router.route("/user/:userId").get(profileController.read);

router.param("userId", profileController.profileByUserId);

module.exports = router;
