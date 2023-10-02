const mongoose = require("mongoose");

const truckSchema = new mongoose.Schema({
  number: Number,
  crewCab: Boolean,
  cdl: Boolean,
  cdlProgram: Boolean,
  goodTailgate: Boolean,
});

const Truck = mongoose.model("Truck", truckSchema);

module.exports = Truck;
