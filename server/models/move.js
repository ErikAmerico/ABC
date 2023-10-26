const mongoose = require("mongoose");

const moveSchema = new mongoose.Schema({
  date: Date,
  startTime: String,
  estimate: String,
  // origin: {
  //   company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  //   contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
  //   altContact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
  //   additional: String,
  // },
  // destination: {
  //   company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  //   contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
  //   altContact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
  //   additional: String,
  // },
  origin: [String],
  destination: [String],
  account: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }],
  remarks: String,
  contact: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  noCrewCab: Boolean,
  tailgate: Boolean,
  truck100: Boolean,
  openBack: Boolean,
  stairs: Boolean,
  tooltime: Boolean,
  crewSize: Number,
  trucks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Truck" }],
  vans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Van" }],
  supervisors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  helpers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  techs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
  },
  description: String,
  insurance: String,
  billTo: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
  attention: String,
  holdForCrates: Boolean,
  salesMan: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  poNum: Number,
  projectNum: Number,
  references: String,
  groupBill: String,
  prePayment: String,
});

const Move = mongoose.model("Move", moveSchema);

module.exports = Move;
