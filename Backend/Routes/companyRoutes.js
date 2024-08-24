const express = require("express");
const {
  register,
  getCompany,
  getCompanyById,
  updateCompany,
} = require("../Controllers/companyController");
const isAuthenticated = require("../middleware/isAuthenticated");
const { singleUpload } = require("../middleware/multer");
const router = express.Router();

router.post("/register", isAuthenticated, register);
router.get("/getcompany", isAuthenticated, getCompany);
router.get("/getcompanybyid/:id", isAuthenticated, getCompanyById);
router.put("/update/:id", isAuthenticated, singleUpload, updateCompany);

module.exports = router;
