const express = require("express");
const {accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup} = require("../controllers/chatControllers");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat)
router.route('/rename').put(protect, renameGroupChat)
router.route('/groupAdd').put(protect, addToGroup )
router.route('/groupRemove').put(protect, removeFromGroup )

module.exports = router;
