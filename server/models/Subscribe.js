const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscribeSchema = mongoose.Schema(
  {
    userTo: { type: Schema.Types.ObjectId, ref: "User" },
    userFrom: { type: Schema.Types.ObjectId, ref: "User" },
    videoId: { type: Schema.Types.ObjectId, ref: "Video" }
  },
  { timestamps: true }
);

const Subscribe = mongoose.model("Subsrcibe", subscribeSchema);

module.exports = { Subscribe };
