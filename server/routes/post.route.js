const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const { isLoggedIn, isCurrentUser } = require("../controllers/auth.controller");

router.param("postId", postController.postById);

// Post routes
router
  .route("/")
  .get(postController.list)
  .post(isLoggedIn, postController.create);

router
  .route("/:postId")
  .get(postController.read)
  .put(isLoggedIn, isCurrentUser, postController.update)
  .delete(isLoggedIn, isCurrentUser, postController.delete);

router.get("/user/:userId", postController.listByUserId);

// Like and unlike post routes
router.get("/like/:postId", isLoggedIn, isCurrentUser, postController.like);
router.get("/unlike/:postId", isLoggedIn, isCurrentUser, postController.unlike);

// Comment and remove comment post routes
router.post(
  "/comment/:postId",
  isLoggedIn,
  isCurrentUser,
  postController.comment
);
router
  .route("/comment/:postId/:commentId")
  .put(isLoggedIn, isCurrentUser, postController.modifyComment)
  .delete(isLoggedIn, isCurrentUser, postController.removeComment);

module.exports = router;
