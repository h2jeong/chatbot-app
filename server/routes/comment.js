const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post("/getComments", (req, res) => {
  Comment.find(req.body)
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, comments });
    });
});

router.post("/addComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, comment });
  });
});

module.exports = router;
