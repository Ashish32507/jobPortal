const Application = require("../Models/applicationModel");
const Job = require("../Models/jobModel");
exports.applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    console.log(userId, jobId);

    if (!userId || !jobId) {
      return res.status(400).json({
        success: false,
        message: "Something is missing",
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const jobExist = await Job.findById(jobId);
    if (!jobExist) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    console.log(newApplication.applicant);
    jobExist.application.push(newApplication.applicant);
    await jobExist.save();

    return res.status(200).json({
      success: true,
      newApplication,
      message: "Successfully applied for this job",
    });
  } catch (err) {
    console.log("Error in application:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found",
      });
    }

    return res.status(200).json({
      success: true,
      applications,
      message: "Applications found",
    });
  } catch (err) {
    console.log("Error in fetching applied jobs:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "application",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "Application",
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
      message: "Applicants found for this job",
    });
  } catch (err) {
    console.log("Error in fetching applicants:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (err) {
    console.log("Error in updating application status:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
