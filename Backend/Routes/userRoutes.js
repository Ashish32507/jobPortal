const express = require("express");
const {
  register,
  login,
  updateProfile,
  logOut,
} = require("../Controllers/userController");
const isAuthenticated = require("../middleware/isAuthenticated");
const { singleUpload } = require("../middleware/multer");
const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.post("/updateprofile", isAuthenticated, singleUpload, updateProfile);
router.get("/logout", logOut);

module.exports = router;
