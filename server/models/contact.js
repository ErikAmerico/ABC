const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  title: String,
  roles: [String],
  email: String,
  phone: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
