// const bcrypt = require("bcrypt");
// const User = require("../server/models/user");
// const db = require("../server/config/connection");

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// db.once("open", () => {
//   console.log("Connected to the database");

//   const firstName = "Nick";
//   const lastName = "Graves";
//   const roles = ["Owner"];
//   const email = "nick@gmail.com";
//   const phone = "555-555-5555";
//   const password = "nick123.";

//   async function createUser() {
//     try {
//       const newUser = new User({
//         firstName,
//         lastName,
//         roles,
//         email,
//         phone,
//         password,
//       });

//       await newUser.save();
//       console.log("User has been created");
//       db.close();
//     } catch (err) {
//       console.error(err);
//       db.close();
//     }
//   }

//   createUser();
// });
