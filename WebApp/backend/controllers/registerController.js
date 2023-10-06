const lotOwnerStruct = require("../Structures/lotOwnerStruct");
const adminStruct = require("../Structures/adminStruct");
const carOwnerStruct = require("../Structures/carOwnerStruct");
const registerOps = require("../db/registerOps");
const bcrypt = require("bcrypt");
const validator = require("validator");

exports.registerAuth = async (req, res) => {
  try {
    const details = req.body;
    /////////////////////////////////////////// USER EXISTS ////////////////////////////////////////////////////////////////////
    if ((await registerOps.userExists(details.email)) === 1) {
      res.status(403).json({ message: "User already exists. Try logging in." });
      return
    } else {

      /////////////////////////////////////////// ADMIN ////////////////////////////////////////////////////////////////////
      if (details.role.toUpperCase() === "ADMIN") {
        if (
          !details.role ||
          !details.firstName ||
          !details.lastName ||
          !details.email.endsWith("@parksense.com") ||
          !details.password ||
          !details.password2
        ) {
          res.status(400).json({ message: "Enter all required fields." });
          return
        }
        if (details.password !== details.password2) {
          res.status(400).json({ message: "Passwords do not match." });
          return
        } else {
          const admin = new adminStruct(
            details.role.toUpperCase(),
            details.firstName.toUpperCase().replace(/'/gi, "''"),
            details.lastName.toUpperCase().replace(/'/gi, "''"),
            details.email.toUpperCase()
          );
          const succ = await registerOps.adminRegister(                                     
            admin,
            await bcrypt.hash(details.password, 10)
          );
          res.status(201).json({ Status: `${succ}` });
          return
        }
      } 

      /////////////////////////////////////////// LOT OWNER ////////////////////////////////////////////////////////////////////
      else if (details.role.toUpperCase() === "LOTOWNER") {
        if (
          !details.role ||
          !validator.isEmail(details.email) ||
          !details.name ||
          !details.phoneNo ||
          !details.password ||
          !details.password2
        ) {
          res.status(400).json({ message: "Enter all required fields." });
          return
        }
        if (details.password !== details.password2) {
          res.status(400).json({ message: "Passwords do not match." });
          return
        } else {
          const lotOwner = new lotOwnerStruct(
            details.role.toUpperCase(),
            details.email.toUpperCase(),
            details.name.toUpperCase().replace(/'/gi, "''"),
            details.phoneNo
            );
          const succ = await registerOps.lotOwnerRegister(                                 
            lotOwner,
            await bcrypt.hash(details.password, 10)
          );
          res.status(201).json({ Status: `${succ}` });
          return
        }
      } 
      
      /////////////////////////////////////////// CAR ////////////////////////////////////////////////////////////////////
      else if (details.role.toUpperCase() === "CAROWNER") {
        if (
          !details.role ||
          !details.firstName ||
          !details.lastName ||
          !details.gender ||
          !details.DOB ||
          !validator.isEmail(details.email) ||
          !details.city ||
          !details.country ||
          !details.password ||
          !details.password2
        ) {
          res.status(400).json({ message: "Enter all required fields." });
          return
        }
        if (details.password !== details.password2) {
          res.status(400).json({ message: "Passwords do not match." });
          return
        } else {
          if (!details.phoneNo) {
            details.phoneNo = "";
          }
          if (!details.coins) {
            details.coins = 0;
          }
          const carOwner = new carOwnerStruct(
            details.role.toUpperCase(),
            details.firstName.toUpperCase().replace(/'/gi, "''"),
            details.lastName.toUpperCase().replace(/'/gi, "''"),
            details.gender.toUpperCase().replace(/'/gi, "''"),
            details.DOB,
            details.phoneNo,
            details.email.toUpperCase(),
            details.city.toUpperCase().replace(/'/gi, "''"),
            details.country.toUpperCase().replace(/'/gi, "''"),
            details.coins
          );
          const succ = await registerOps.carOwnerRegister(                                  
            carOwner,
            await bcrypt.hash(details.password, 10)
          );
          res.status(201).json({ Status: `${succ}` });
          return
        }
      }
      /////////////////////////////////////////// INVALID ROLE ////////////////////////////////////////////////////////////////////
      else {
        res.status(400).json({ message: "Invalid role." });
        return
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
    return
  }
};