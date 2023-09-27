const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  title: String,
  email: String,
  phone: String,
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  }, // Company to which this contact belongs if they do not work for JLL or similar
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
