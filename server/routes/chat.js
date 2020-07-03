const express = require("express");
const router = express.Router();
const { Chat } = require("../models/Chat");

const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    // cb(null, file.fieldname + "-" + Date.now());
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // fileFilter
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".mp4" && ext !== ".gif") {
      return cb(res.status(400).end("Only image is allowed"), false);
    }
    cb(null, true);
  }
});

let upload = multer({ storage: storage }).single("file");

router.post("/uploadFiles", auth, (req, res) => {
  // make storage and upload - multer
  upload(req, res, err => {
    if (err) return res.status(400).json({ success: false, err });
    return res.json({ success: true, url: res.req.file.path });
  });
});

router.get("/getChats", (req, res) => {
  Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).send(chats);
    });
});

module.exports = router;
