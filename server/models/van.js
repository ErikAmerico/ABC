const mongoose = require("mongoose");

const vanSchema = new mongoose.Schema({
  number: Number,
  openBack: Boolean,
  roles: [String],
});

const Van = mongoose.model("Van", vanSchema);

module.exports = Van;
