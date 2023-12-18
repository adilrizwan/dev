const express = require("express");
var colors = require("colors");
require("dotenv").config();
const cors = require("cors");
const { connectMSSQL } = require("./db/sqlConfig");
const { connectFirebase, fb } = require("./db/firebaseConfig");

const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const lotOwnerRoutes = require("./routes/lotOwnerRoutes");
const carOwnerRoutes = require("./routes/carOwnerRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

connectMSSQL();
connectFirebase();

// app.post("/test", async (req, res) => {
//   try {
//     const id = req.body.email;
//     const userJson = {
//       email: req.body.email,
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//     };
//     const response = await fb.collection("test").doc(id).set(userJson);
//     res.send(response);
//   } catch (error) {
//     console.log(error)
//     res.send(error);
//   }
// });

app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/admin", adminRoutes);
app.use("/lot", lotOwnerRoutes);
app.use("/car", carOwnerRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`.underline.magenta);
});
