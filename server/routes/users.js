const express = require("express");
const router = express.Router();
const { User } = require("../models/Users");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  // console.log(req.body, user);
  user.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ success: false, err });

    if (user.password !== req.body.password) {
      return res.status(400).json({ success: false, err });
    }

    return res.status(200).json({ success: true, userId: user._id });
  });
});

module.exports = router;
