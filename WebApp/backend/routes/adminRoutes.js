const express = require("express");
const router = express.Router();
const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const admin = require("../controllers/adminController");
const auth = require("../middleware/auth")

router.post("/register", register.registerAuth);
router.post("/login", login.loginAuth);


router.get("/profile", auth, admin.getProfile);
router.put("/profile", auth, admin.updateProfile);
router.post("/search", auth, admin.search);

module.exports = router;