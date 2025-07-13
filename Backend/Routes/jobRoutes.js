const express = require("express");
const {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} = require("../Controllers/jobController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.post("/postjob", isAuthenticated, postJob);
router.get("/getalljob", getAllJobs);
router.get("/getjobbyid/:id", getJobById);
router.get("/getadminjob", isAuthenticated, getAdminJobs);

module.exports = router;
