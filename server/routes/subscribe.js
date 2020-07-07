const express = require("express");
const router = express.Router();
const { Subscribe } = require("../models/Subscribe");

router.post("/getCount", (req, res) => {
  Subscribe.find({ videoId: req.body.videoId }, (err, result) => {
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

module.exports = router;
