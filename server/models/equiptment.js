const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  dollies: Number,
  comps: Number,
  panels: Number,
  library: Number,
  bins: Number,
  teachBins: Number,
  trashBins: Number,
  tools: [String],
  makita: [Number],
  ramps: [Number],
  platform: Number,
  steelPlate: Number,
  hoodLift: Number,
  safeJacks: [String],
  palletJacks: Number,
  sknnyJack: Number,
  Jbar: Number,
  bigRed: Number,
  masonite: String,
  ductTape: Number,
  blutTape: Number,
  coroflex: Number,
  carpetGuard: Boolean,
  broom: Boolean,
  allenSet: Boolean,
  bitBox: Boolean,
  socketSet: Boolean,
  foam: [String],
  white: [String],
  carpetRiser: Number,
  rubberRiser: Number,
  other: String,
});

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;
