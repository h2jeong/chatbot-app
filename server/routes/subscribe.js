const express = require("express");
const router = express.Router();
const { Subscribe } = require("../models/Subscribe");
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");

router.post("/getCount", (req, res) => {
  Subscribe.find({ userTo: req.body.userTo }, (err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, count: result.length });
  });
});

router.post("/isSubscribed", (req, res) => {
  Subscribe.findOne(req.body, (err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/onSubscribe", (req, res) => {
  const subscribe = new Subscribe(req.body);

  subscribe.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/Unsubscribe", (req, res) => {
  Subscribe.findOneAndDelete(req.body).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.post("/subscribedList", auth, (req, res) => {
  // console.log("userFrom:", req.user._id);
  Subscribe.find({ userFrom: req.user._id }, (err, list) => {
    if (err) return res.status(400).json({ success: false, err });
    let userList = list.map(el => el.userTo);
    // console.log(userList);

    Video.find({ writer: { $in: userList } })
      .populate("writer")
      .exec((err, videos) => {
        if (err) return res.status(400).json({ success: false, err });
        // console.log("videoList:", videos);
        res.status(200).json({ success: true, videos });
      });
  });
});

module.exports = router;
