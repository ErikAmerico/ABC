const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema({
  number: Number,
  crewCab: Boolean,
  cdl: Boolean,
  cdlProgram: Boolean,
  goodTailgate: Boolean,
  roles: [String],
});

const Truck = mongoose.model("Truck", truckSchema);

module.exports = Truck;
