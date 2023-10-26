const { signToken } = require("../utils/auth");
const User = require("../models/user");
const Job = require("../models/job");
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

function deepConvertObjectIdToString(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => deepConvertObjectIdToString(item));
  }
  if (obj && typeof obj === "object") {
    for (const key in obj) {
      if (obj[key] instanceof mongoose.Types.ObjectId) {
        obj[key] = obj[key].toString();
      } else if (typeof obj[key] === "object") {
        obj[key] = deepConvertObjectIdToString(obj[key]);
      }
    }
  }
  return obj;
}

const resolvers = {
  Query: {
    getUser: (parent, { id }) => {
      return User.findById(id);
    },

    users: async () => {
      return await User.find();
    },

    getJob: (parent, { id }) => {
      return Job.findById(id).populate(
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

    // getJobsByDate: async (parent, { date }) => {
    //   return await Job.find({ date: date }); // Assuming you're using Mongoose and have a Job model
    // },

    getJobsByDate: async (parent, { date }) => {
      const jobs = await Job.find({ date: date })
        .populate("trucks")
        .populate("vans")
        .populate("account")
        .populate("contact")
        .populate("drivers")
        .populate("helpers")
        .populate("techs")
        .populate("supervisors")
        .populate("date")
        .populate("startTime")
        .populate("origin")
        .populate("destination")
        .populate("serviceType")
        .populate("remarks")
        .populate("crewSize");

      // console.log(jobs);
      // console.log(JSON.stringify(jobs, null, 2));

      return jobs.map((job) => {
        let jobObj = job.toObject();
        jobObj = deepConvertObjectIdToString(jobObj);
        return {
          ...jobObj,
          id: jobObj._id.toString(), // Convert the main Job's _id to id
          trucks: jobObj.account.map((acc) => ({
            ...acc,
            id: acc._id.toString(),
          })),
          vans: jobObj.vans.map((van) => ({ ...van, id: van._id.toString() })),
          account: jobObj.account.map((acc) => ({
            ...acc,
            id: acc._id.toString(),
          })),
          contact: jobObj.contact.map((cont) => ({
            ...cont,
            id: cont._id.toString(),
          })),
          drivers: jobObj.drivers.map((driv) => ({
            ...driv,
            id: driv._id.toString(),
          })),
          helpers: jobObj.helpers.map((help) => ({
            ...help,
            id: help._id.toString(),
          })),
          techs: jobObj.techs.map((tech) => ({
            ...tech,
            id: tech._id.toString(),
          })),
          supervisors: jobObj.supervisors.map((sup) => ({
            ...sup,
            id: sup._id.toString(),
          })),
          date: jobObj.date,
          startTime: jobObj.startTime,
          origin: jobObj.origin,
          destination: jobObj.destination,
          serviceType: jobObj.serviceType,
          remarks: jobObj.remarks,
          crewSize: jobObj.crewSize,
        };
      });
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

    createJob: async (parent, { input }) => {
      try {
        const job = await Job.create(input);

        const convertToIdString = (arr) =>
          arr.map((item) => ({
            ...item._doc,
            id: item._id.toString(),
          }));

        return {
          ...job._doc,
          id: job._id.toString(),
          supervisors: convertToIdString(job.supervisors),
          drivers: convertToIdString(job.drivers),
          helpers: convertToIdString(job.helpers),
          techs: convertToIdString(job.techs),
          contact: convertToIdString(job.contact),
          trucks: convertToIdString(job.trucks),
          vans: convertToIdString(job.vans),
          account: convertToIdString(job.account),
        };
      } catch (err) {
        console.error("Error while creating Job:", err);
        throw new Error("Failed to create Job");
      }
    },

    updateJob: (parent, { id, input }) => {
      return Job.findByIdAndUpdate(id, input, { new: true });
    },

    deleteJob: (parent, { id }) => {
      return Job.findByIdAndDelete(id);
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
