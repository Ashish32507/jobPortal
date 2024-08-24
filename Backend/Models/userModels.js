const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enaum: ["Student", "Recruiter"],
    },
    profile: {
      bio: {
        type: String,
      },
      skill: [
        {
          type: String,
          default: "",
        },
      ],
      resume: {
        type: String,
      },
      resumeOrignalName: {
        type: String,
      },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
