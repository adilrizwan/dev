require("dotenv").config();
const {detectSpaces} = require('./cv/parkingController')
require("colors");

const express = require("express");
const { connectFirebase, fb } = require("./db/firebaseConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;

connectFirebase();
detectSpaces();

app.listen(PORT, () => {
  console.log(`\nMobile App Server is listening on ${PORT}`.underline.green);
});
