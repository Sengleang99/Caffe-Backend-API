const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  created: { type: Date, default: Date.now}
});

const User = mongoose.model("users", userSchema);
module.exports = User;
