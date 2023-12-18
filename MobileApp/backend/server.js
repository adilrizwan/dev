require("dotenv").config();
const cors = require('cors');
const {detectSpaces} = require('./cv/spaceDetector')
const parkingSpaceRouter = require("./routes/parkingSpaceRouter")
require("colors");

const express = require("express");
const { connectFirebase } = require("./db/firebaseConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", parkingSpaceRouter)
const PORT = process.env.PORT || 8000;

connectFirebase();
detectSpaces();

app.listen(PORT, () => {
  console.log(`\nMobile App Server is listening on ${PORT}`.underline.green);
});
