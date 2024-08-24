const JobModel = require("../Models/jobModel");

exports.postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience, // corrected typo
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // Ensure all required fields are provided
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // Ensure the requirements field is a comma-separated string and trim it
    const formattedRequirements = requirements
      .split(",")
      .map((req) => req.trim());

    // Create a new job using the JobModel
    const job = await JobModel.create({
      title,
      description,
      requirements: formattedRequirements,
      salary,
      location,
      jobType,
      experience, // corrected typo
      position,
      company: companyId,
      created_by: userId,
    });

    // Respond with success
    return res.status(201).json({
      message: "New job created",
      job,
      success: true,
    });
  } catch (err) {
    // Log and return the error response
    console.error("Error in job posting:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      err,
    });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await JobModel.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    console.error("Error in getting jobs:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    // console.log(jobId);
    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.error("Error in getting job by ID:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await JobModel.find({ created_by: adminId }).populate({
      path: "company",
    });

    if (!jobs.length) {
      return res.status(404).json({
        message: "No Data Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs Are Found",
      jobs,
      success: true,
    });
  } catch (err) {
    console.error("Error in getting admin jobs:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
