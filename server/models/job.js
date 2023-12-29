const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
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
  serviceType: String,
  remarks: String,
  contact: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }],
  callContactUponArrival: Boolean,
  callContactWhenLeavingAbc: Boolean,
  callContactWhenClose: Boolean,
  noCrewCabs: Boolean,
  tailgate: Boolean,
  truck100: Boolean,
  openBack: Boolean,
  stairs: Boolean,
  toolTime: Boolean,
  materialSheet: Boolean,
  bostonCrateSheet: Boolean,
  parkingPermits: Boolean,
  directions: Boolean,
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
  other: String,
  minInsurance: Boolean,
  selfInsurance: Boolean,
  frcInsurance: Boolean,
  cost: String,
  emailInvoice: String,
  billTo: String,
  holdForCrates: Boolean,
  salesMan: String,
  author: String,
  poNum: String,
  projectNum: String,
  references: String,
  groupBill: String,
  prePayment: String,
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
