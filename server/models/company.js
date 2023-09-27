const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  floors: [
    {
      floorNumber: [Number],
      rooms: [String], // Array of room numbers on this floor
    },
  ],
});

const companySchema = new mongoose.Schema({
  names: [String], // Array of names by which the company can be identified
  addresses: [addressSchema], // Array of addresses
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contact" }], // if contacts work directly for this company
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
