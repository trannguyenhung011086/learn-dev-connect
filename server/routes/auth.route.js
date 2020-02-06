const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/:userId/:token/activate", authController.activate);

module.exports = router;
