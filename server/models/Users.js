const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: { type: String, maxLength: 50 },
  email: { type: String, unique: true },
  password: { type: String, minLenght: 5 },
  role: { type: Number, default: 0 },
  token: { type: String }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
