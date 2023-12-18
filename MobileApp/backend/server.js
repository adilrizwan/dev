require("dotenv").config();
const cors = require('cors');
const {detectSpaces} = require('./cv/parkingController')
const parkingSpaceRouter = require("./routes/parkingSpaceRouter")
require("colors");

const express = require("express");
const { connectFirebase } = require("./db/firebaseConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", parkingSpaceRouter)
const PORT = 5000;
// process.env.PORT
connectFirebase();
// detectSpaces();

app.listen(PORT, () => {
  console.log(`\nMobile App Server is listening on ${PORT}`.underline.green);
});
