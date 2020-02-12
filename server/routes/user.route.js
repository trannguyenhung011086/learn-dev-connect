const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { isLoggedIn, isCurrentUser } = require("../controllers/auth.controller");

router
  .route("/")
  .get(userController.list)
  .post(userController.create);

router
  .route("/:userId")
  .get(isLoggedIn, userController.read)
  .put(isLoggedIn, isCurrentUser, userController.update)
  .delete(isLoggedIn, isCurrentUser, userController.delete);

router.param("userId", userController.userById);

module.exports = router;
