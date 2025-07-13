const User = require("../Models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUril");
const cloudinary = require("../utils/cloudinary");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    const file = req.file;

    console.log(fullname, email, phoneNumber, password, role, file);

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    console.log(file);
    let cloudResponse = "";
    if (file) {
      try {
        const fileUri = getDataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("Response ", cloudResponse);
      } catch (uploadErr) {
        console.log("Cloudinary upload error:", uploadErr);
        return res.status(500).json({
          message: "Failed to upload file to Cloudinary",
          success: false,
        });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      message: "Account created",
      success: true,
    });
  } catch (err) {
    console.log("Error occurred in register function in UserController:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(email, password, role);
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const newUser = user.toObject();
    newUser.password = undefined;

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back, ${user.fullname}`,
        success: true,
        user: newUser,
      });
  } catch (err) {
    console.log("Error occurred in login function in UserController:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (err) {
    console.log("Error occurred in logOut function in UserController:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    console.log(cloudinary);
    const { fullname, email, phoneNumber, bio, skill } = req.body;
    console.log(fullname, email, phoneNumber, bio, skill);

    const file = req.file;
    console.log(file);

    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) {
      user.fullname = fullname;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skill) {
      user.profile.skill = skill.split(",");
    }

    if (file) {
      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        user.profile.resume = cloudResponse.secure_url;
        user.profile.resumeOrignalName = file.originalname;
      } catch (uploadErr) {
        console.log("Cloudinary upload error:", uploadErr);
        return res.status(500).json({
          message: "Failed to upload file to Cloudinary",
          success: false,
        });
      }
    }

    await user.save();

    const updatedUser = user.toObject();
    updatedUser.password = undefined;

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
      success: true,
    });
  } catch (err) {
    console.log(
      "Error occurred in updateProfile function in UserController:",
      err
    );
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
