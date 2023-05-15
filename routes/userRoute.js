const express = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.route("/logout").post(authController.logout);

router.route("/leaderboard").get(userController.getLeaderBoard)

// router.route("/").get(authController.protected, userController.getAllUser);

router.route("/").get( userController.getAllUser);


module.exports = router;
