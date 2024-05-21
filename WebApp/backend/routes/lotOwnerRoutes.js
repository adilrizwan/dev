const express = require("express");
const router = express.Router();
const lotOwnerController = require("../controllers/lotOwnerController");
const register = require("../controllers/registerController");
const auth = require("../middleware/auth");

router.post("/register" , register.registerAuth)

router.get("/", auth , lotOwnerController.viewLots)
router.get("/profile", auth, lotOwnerController.getProfile)
router.put("/profile", auth , lotOwnerController.updateProfile)
router.post("/add", auth , lotOwnerController.addLot)

router.post("/support", auth , lotOwnerController.support)
router.patch("/status", auth , lotOwnerController.updateLotStatus)

module.exports = router;