const CompanyModel = require("../Models/companyModel");
const getDataUri = require("../utils/dataUril");
const cloudinary = require("../utils/cloudinary");
exports.register = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await CompanyModel.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't add the same company",
        success: false,
      });
    }

    company = await CompanyModel.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      company,
    });
  } catch (err) {
    console.error("Error from company register:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await CompanyModel.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (err) {
    console.error("Error occurred in getCompany:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await CompanyModel.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (err) {
    console.error("Error occurred in getCompanyById:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // Initialize the updateData object with the provided fields
    const updateData = { name, description, website, location };

    // Check if a file is provided before trying to process it
    if (file) {
      try {
        // Convert the file to a data URI format
        const fileUri = getDataUri(file);
        // Upload the file to Cloudinary and get the secure URL
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("Cloudinary upload response:", cloudResponse);

        // Add the secure URL to the updateData object
        updateData.logo = cloudResponse.secure_url;
      } catch (cloudinaryErr) {
        console.error("Cloudinary upload error:", cloudinaryErr);
        return res.status(500).json({
          message: "Failed to upload file to Cloudinary",
          success: false,
        });
      }
    }

    console.log("Update Data:", updateData);

    // Find the company by ID and update its details
    const company = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    // If the company is not found, return a 404 response
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Successfully updated the company
    return res.status(200).json({
      message: "Company information updated",
      success: true,
      company,
    });
  } catch (err) {
    // Handle any server-side errors
    console.error("Error occurred in updateCompany:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
