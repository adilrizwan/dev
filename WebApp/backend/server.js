const express = require("express");
var colors = require('colors');
require("dotenv").config();
const {connectMSSQL} = require("./db/sqlConfig");

const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const lotOwnerRoutes = require("./routes/lotOwnerRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

connectMSSQL();

app.use("/register", registerRoutes)
app.use("/login", loginRoutes)
app.use("/admin", adminRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`.underline.yellow);
});