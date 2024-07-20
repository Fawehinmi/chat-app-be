const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { registerUser, loginUser, allUsers } = require("../controllers/userControllers");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route('/').get(protect, allUsers)

module.exports = router;
