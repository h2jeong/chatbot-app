const express = require("express");
const router = express.Router();
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: function(req, file, cb) {
    const ext = file.originalname.substring(file.originalname.length - 3);
    if (ext !== "mp4") {
      return cb(new Error("Only mp4 can be allowed"), false);
    }
    cb(null, true);
  }
});
let upload = multer({ storage: storage }).single("file");

router.post("/uploadFiles", (req, res) => {
  upload(req, res, err => {
    if (err) return res.status(400).json({ success: false, err });
    // console.log(req.file);

    res.status(200).json({
      success: true,
      filePath: req.file.path,
      fileName: req.file.filename
    });
  });
});

router.post("/thumbnails", (req, res) => {
  console.log(req.body);
  // if (err) return res.status(400).json({ success: false, err });
  // console.log(req.file);
  let duration = "";
  let thumbnail = "";

  // metadata 받아서 duration 정보 저장하고
  ffmpeg.ffprobe(req.body.filePath, (err, metadata) => {
    duration = metadata.format.duration;
  });

  // 폴더에 저장하고 path 정보 저장하고
  ffmpeg(req.body.filePath)
    .on("err", err => {
      return res.json({ success: false, err });
    })
    .on(
      "filenames",
      filenames => (thumbnail = "uploads/thumbnails/" + filenames[0])
    )
    .on("end", () => {
      // 넘겨줄 정보만 보내기
      res.status(200).json({
        success: true,
        thumbnail: thumbnail,
        duration: duration
      });
    })
    .screenshots({
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumbnail-%b.png"
    });
});
module.exports = router;
