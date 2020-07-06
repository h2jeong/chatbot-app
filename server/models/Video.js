const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    title: { type: String, maxLength: 200 },
    description: { type: String, maxLength: 1000 },
    writer: { type: Schema.Types.ObjectId, ref: "User" },
    privacy: { type: Number },
    category: { type: String },
    filepath: { type: String },
    duration: { type: String },
    views: { type: Number, default: 0 },
    thumbnail: { type: String }
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
