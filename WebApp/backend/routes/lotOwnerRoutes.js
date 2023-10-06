const express = require("express");
const router = express.Router();
const lotOwnerController = require("../controllers/lotOwnerController");
const auth = require("../middleware/auth");


router.get("/profile", auth, lotOwnerController.getProfile)
router.put("/profile", auth , lotOwnerController.updateProfile)
router.post("/add", auth , lotOwnerController.addLot)
router.patch("/status", auth , lotOwnerController.updateLotStatus)

module.exports = router;