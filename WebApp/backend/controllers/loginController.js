const loginOps = require("../db/loginOps");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email) || !password) {
      res.status(400).json({ message: "Enter all required fields." });
    } else {
      const pass = await loginOps.loginOps(email);
      if (pass === 0) {
        res.status(401).send("Incorrect Email");
        return;
      } else {
        if (await bcrypt.compare(password, pass.Password)) {
          const details = await loginOps.getDetails(email, pass.UserRole);
          var jwToken;
          if (
            pass.UserRole.toUpperCase() === "CAROWNER" ||
            pass.UserRole.toUpperCase() === "ADMIN"
          ) {
            jwToken = generateToken(
              pass.UserRole.toUpperCase(),
              details.ID,
              details.FirstName
            );
          } else {
            jwToken = generateToken(
              pass.UserRole.toUpperCase(),
              details.ID,
              details.Name
            );
          }
          res.send({
            token: jwToken,
            role: pass.UserRole,
            Details: details
          })
          return;
        } else {
          res.status(401).send("Incorrect password.");
          return;
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
    return;
  }
};
const generateToken = (role, id, name) => {
  return jwt.sign({ role, id, name }, process.env.JWT_SECRET, {
    expiresIn: "10000s",
  });
};
