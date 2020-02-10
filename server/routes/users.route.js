const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const { isLoggedIn, isCurrentUser } = require("../controllers/auth.controller");

router
  .route("/")
  .get(usersController.list)
  .post(usersController.create);

router
  .route("/:userId")
  .get(isLoggedIn, usersController.read)
  .put(isLoggedIn, isCurrentUser, usersController.update)
  .delete(isLoggedIn, isCurrentUser, usersController.delete);

router.param("userId", usersController.userById);

module.exports = router;
