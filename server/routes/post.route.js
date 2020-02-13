const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const { isLoggedIn, isCurrentUser } = require("../controllers/auth.controller");

router
  .route("/")
  .get(postController.list)
  .post(isLoggedIn, postController.create);

router
  .route("/:postId")
  .get(postController.read)
  .put(isLoggedIn, isCurrentUser, postController.update)
  .delete(isLoggedIn, isCurrentUser, postController.delete);

router.param("postId", postController.postById);

router.get("/user/:userId", postController.listByUserId);

module.exports = router;
