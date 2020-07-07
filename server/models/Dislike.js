const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
  {
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    userFrom: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Dislike = mongoose.model("Dislike", dislikeSchema);

module.exports = { Dislike };
