const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Unlike } = require("../models/Unlike");
const { auth } = require("../middleware/auth");

router.post("/getLikes", (req, res) => {
  //console.log(req.body.videoId);
  const query = req.body.videoId
    ? { videoId: req.body.videoId }
    : { commentId: req.body.commentId };
  Like.find(query, (err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, likes });
  });
});

router.post("/getUnlikes", (req, res) => {
  const query = req.body.videoId
    ? { videoId: req.body.videoId }
    : { commentId: req.body.commentId };
  //console.log(query);
  Unlike.find(query, (err, unlikes) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, unlikes });
  });
});

router.post("/addLike", (req, res) => {
  //   console.log("addLike:", req.body, res.user);
  //   const query = req.body.videoId
  //     ? { userFrom: req.user._id, videoId: req.body.videoId }
  //     : { userFrom: req.user._id, commentId: req.body.commentId };
  //console.log("addLike:", req.body);
  const like = new Like(req.body);
  like.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    Unlike.findOneAndDelete(req.body, (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/addUnLike", (req, res) => {
  //console.log(req.body);
  const unlike = new Unlike(req.body);
  unlike.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    Like.findOneAndDelete(req.body, (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

router.post("/reduceLike", (req, res) => {
  //console.log(req.body);
  Like.findOneAndDelete(req.body, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
router.post("/reduceUnlike", (req, res) => {
  Unlike.findOneAndDelete(req.body, (err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = router;
