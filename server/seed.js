// const bcrypt = require("bcrypt");
// const User = require("../server/models/user");
// const db = require("../server/config/connection");

// const saltRounds = 10;
// const plainTextPassword = "nick123.";

// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// db.once("open", () => {
//   console.log("Connected to the database");

//   const firstName = "Nick";
//   const lastName = "Graves";
//   const roles = ["Owner"];
//   const email = "nick@gmail.com";
//   const phone = "555-555-5555";

//   async function createUser() {
//     try {
//       const hash = await bcrypt.hash(plainTextPassword, saltRounds);

//       const newUser = new User({
//         firstName,
//         lastName,
//         roles,
//         email,
//         phone,
//         password: hash,
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
