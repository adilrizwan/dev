const express = require("express");
const router = express.Router();
const carOwnerController = require("../controllers/carOwnerController");
const auth = require("../middleware/auth");


router.get("/", auth , carOwnerController.dashboard)
router.get("/profile", auth, carOwnerController.getProfile)
router.put("/profile", auth , carOwnerController.updateProfile)
router.post("/add", auth , carOwnerController.addCar)
router.delete("/delete", auth , carOwnerController.deleteCar)

module.exports = router;