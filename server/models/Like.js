const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema(
  {
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    userFrom: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };
