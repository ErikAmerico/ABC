const bcrypt = require("bcrypt");
const User = require("../server/models/user");
const Truck = require("../server/models/truck");
const Van = require("../server/models/van");
const db = require("../server/config/connection");
const { create } = require("./models/move");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to the database");

  //   const firstName = "Chris";
  //   const lastName = "Salvatti";
  //   const roles = ["Driver", "Helper", "ForkLift"];
  //   const email = "chris@gmail.com";
  //   const phone = "781-322-1521";
  //   const password = "chris123.";

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

  //   const number = "114";
  //   const crewCab = false;
  //   const cdl = false;
  //   const cdlProgram = false;
  //   const goodTailgate = false;
  //   const roles = ["Truck"];

  //   async function createTruck() {
  //     try {
  //       const newTruck = new Truck({
  //         number,
  //         crewCab,
  //         cdl,
  //         cdlProgram,
  //         goodTailgate,
  //         roles,
  //       });

  //       await newTruck.save();
  //       console.log("Truck has been created");
  //       db.close();
  //     } catch (err) {
  //       console.error(err);
  //       db.close();
  //     }
  //   }

  //   createTruck();
  // });

  const number = "99";
  const openBack = false;
  const roles = ["Van"];

  async function createVan() {
    try {
      const newVan = new Van({
        number,
        openBack,
        roles,
      });

      await newVan.save();
      console.log("Van has been created");
      db.close();
    } catch (err) {
      console.error(err);
      db.close();
    }
  }

  createVan();
});
