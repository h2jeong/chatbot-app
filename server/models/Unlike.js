const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const unlikeSchema = mongoose.Schema(
  {
    videoId: { type: Schema.Types.ObjectId, ref: "Video" },
    commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
    userFrom: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Unlike = mongoose.model("Unlike", unlikeSchema);

module.exports = { Unlike };
