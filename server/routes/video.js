const express = require("express");
const router = express.Router();
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
  fileFilter: function(req, file, cb) {
    if (path.extname(file.originalname) !== ".mp4") {
      return cb(res.status(400).end("Only mp4 is allowed"), false);
    }
    cb(null, true);
  }
});
let upload = multer({ storage }).single("file");

router.post("/uploadFiles", (req, res) => {
  upload(req, res, err => {
    if (err) return res.json({ success: false, err });
    // console.log(req.file);
    res.json({
      success: true,
      filePath: req.file.path
    });
  });
});

router.post("/thumbnails", (req, res) => {
  // metadata 에서 duration 받기
  let duration = "";
  // thumbnailPath 는?
  // https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#screenshotsoptions-dirname-generate-thumbnails
  let thumbnailPath = "";
  console.log("thumb:", req.body);
  ffmpeg.ffprobe(req.body.filePath, function(err, metadata) {
    if (err) return res.json({ success: false, err });
    // console.log("metadata:", metadata.format);
    duration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function(filenames) {
      // console.log("Will generate " + filenames.join(", "));
      thumbnailPath = `uploads/thumbnails/${filenames[0]}`;
    })
    .on("end", function() {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbnailPath: thumbnailPath,
        duration: duration
      });
    })
    .on("error", function(err) {
      // console.log("an error happened: ", err.message);
      return res.json({ success: false, err });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png"
    });
});

router.post("/uploadVideo", auth, (req, res) => {
  const video = new Video(req.body);
  video.writer = req.user._id;
  // console.log("video: ", video);

  video.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
