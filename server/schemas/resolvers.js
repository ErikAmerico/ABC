const { signToken } = require("../utils/auth");
const User = require("../models/user");
const Move = require("../models/move");
const Company = require("../models/company");
const Contact = require("../models/contact");
const bcrypt = require("bcrypt");

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

    getMove: (parent, { id }) => {
      return Move.findById(id).populate("supervisors drivers helpers techs");
    },

    getCompany: (parent, { id }) => {
      return Company.findById(id).populate("contacts");
    },

    getContact: (parent, { id }) => {
      return Contact.findById(id);
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      //const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new AuthenticationError("Incorrect email");
      }

      console.log(user);
      console.log("Stored Hash:", user.password);
      console.log("Entered Password Hash:", await bcrypt.hash(password, 10));

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

    createMove: (parent, { input }) => {
      return Move.create(input);
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

    createContact: (parent, { input }) => {
      return Contact.create(input);
    },

    updateContact: (parent, { id, input }) => {
      return Contact.findByIdAndUpdate(id, input, { new: true });
    },

    deleteContact: (parent, { id }) => {
      return Contact.findByIdAndDelete(id);
    },
  },
};

module.exports = resolvers;
