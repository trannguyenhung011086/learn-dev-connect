const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router
  .route("/")
  .get(usersController.list)
  .post(usersController.create);

router
  .route("/:userId")
  .get(usersController.read)
  .put(usersController.update)
  .delete(usersController.delete);

router.param("userId", usersController.userById);

module.exports = router;
