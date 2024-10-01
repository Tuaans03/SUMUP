const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("User", userSchema);
