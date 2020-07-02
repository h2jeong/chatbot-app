const express = require("express");
const router = express.Router();
const { Chat } = require("../models/Chat");
const { auth } = require("../middleware/auth");

router.get("/getChats", (req, res) => {
  Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).send(chats);
    });
});

module.exports = router;
