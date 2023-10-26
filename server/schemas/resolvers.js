const { signToken } = require("../utils/auth");
const User = require("../models/user");
const Move = require("../models/move");
const Company = require("../models/company");
const Contact = require("../models/contact");
const Truck = require("../models/truck");
const Van = require("../models/van");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

const resolvers = {
  Query: {
    getUser: (parent, { id }) => {
      return User.findById(id);
    },

    users: async () => {
      return await User.find();
    },

    getMove: (parent, { id }) => {
      return Move.findById(id).populate(
        "supervisors",
        "drivers",
        "helpers",
        "techs",
        "equipment"
      );
    },

    getCompany: (parent, { id }) => {
      return Company.findById(id).populate("contacts");
    },

    getCompanies: async () => {
      return await Company.find().populate("contacts");
    },

    // getContact: (parent, { id }) => {
    //   return Contact.findById(id);
    // },

    getContact: async (parent, { id }) => {
      // Find the contact by its ID and populate 'company' field
      const contact = await Contact.findById(id).populate("company");

      // Return populated contact
      return contact;
    },

    getContacts: async () => {
      return await Contact.find().populate("company");
    },

    getTruck: (parent, { id }) => {
      return Truck.findById(id);
    },

    getTrucks: async () => {
      const trucks = await Truck.find();
      return trucks;
    },

    getVan: (parent, { id }) => {
      return Van.findById(id);
    },

    getVans: async () => {
      const vans = await Van.find();
      return vans;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      //const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new AuthenticationError("Incorrect email");
      }

      //console.log(user);
      //console.log("Stored Hash:", user.password);
      //console.log("Entered Password Hash:", await bcrypt.hash(password, 10));

      const correctPw = await user.isCorrectPassword(password.trim());
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },

    createUser: (parent, { input }) => {
      return User.create(input);
    },

    updateUser: (parent, { id, input }) => {
      return User.findByIdAndUpdate(id, input, { new: true });
    },
    deleteUser: (parent, { id }) => {
      return User.findByIdAndDelete(id);
    },

    createMove: async (parent, { input }) => {
      try {
        const move = await Move.create(input);

        const convertToIdString = (arr) =>
          arr.map((item) => ({
            ...item._doc,
            id: item._id.toString(),
          }));

        return {
          ...move._doc,
          id: move._id.toString(),
          supervisors: convertToIdString(move.supervisors),
          drivers: convertToIdString(move.drivers),
          helpers: convertToIdString(move.helpers),
          techs: convertToIdString(move.techs),
          contact: convertToIdString(move.contact),
          trucks: convertToIdString(move.trucks),
          vans: convertToIdString(move.vans),
          account: convertToIdString(move.account),
        };
      } catch (err) {
        console.error("Error while creating move:", err);
        throw new Error("Failed to create move");
      }
    },

    updateMove: (parent, { id, input }) => {
      return Move.findByIdAndUpdate(id, input, { new: true });
    },

    deleteMove: (parent, { id }) => {
      return Move.findByIdAndDelete(id);
    },
    createCompany: (parent, { input }) => {
      return Company.create(input);
    },

    updateCompany: (parent, { id, input }) => {
      return Company.findByIdAndUpdate(id, input, { new: true });
    },

    deleteCompany: (parent, { id }) => {
      return Company.findByIdAndDelete(id);
    },

    createContact: async (parent, { input }) => {
      const newContact = new Contact(input);
      await newContact.save();

      const companyId = newContact.company;

      // Populate 'company' field after saving
      await newContact.populate("company");

      // Update company with new contact
      await Company.findByIdAndUpdate(companyId, {
        $push: { contacts: newContact._id },
      });

      // Return populated contact
      return newContact;
    },

    updateContact: (parent, { id, input }) => {
      return Contact.findByIdAndUpdate(id, input, { new: true });
    },

    deleteContact: (parent, { id }) => {
      return Contact.findByIdAndDelete(id);
    },

    createTruck: async (parent, { input }) => {
      try {
        return await Truck.create(input);
      } catch (error) {
        throw new Error("Failed to create truck");
      }
    },

    updateTruck: (parent, { id, input }) => {
      return Truck.findByIdAndUpdate(id, input, { new: true });
    },

    deleteTruck: (parent, { id }) => {
      return Truck.findByIdAndDelete(id);
    },

    createVan: (parent, { input }) => {
      return Van.create(input);
    },

    updateVan: (parent, { input }) => {
      return Van.findByIdAndUpdate(id, input, { new: true });
    },

    deleteVan: (parent, { id }) => {
      return Van.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
