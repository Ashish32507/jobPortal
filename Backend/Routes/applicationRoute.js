const express = require("express");
const {
  applyJob,
  getAppliedJob,
  getApplicant,
  updateStatus,
} = require("../Controllers/applicationController");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

// Define routes
router.get("/apply/:id", isAuthenticated, applyJob);
router.get("/getallApplied/:id", isAuthenticated, getAppliedJob);
router.get("/getapplicant/:id/applicant", isAuthenticated, getApplicant); // Corrected spelling
router.post("/status/:id/update", isAuthenticated, updateStatus);

module.exports = router;
