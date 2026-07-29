import mongoose from "mongoose";

const STATUS = [
  "Wishlist",
  "Applied",
  "OA Received",
  "OA Cleared",
  "Interview Scheduled",
  "Offer",
  "Rejected",
  "Ghosted",
];

const PLATFORMS = [
  "LinkedIn",
  "Naukri",
  "Instahyre",
  "Wellfound",
  "Cutshort",
  "Referral",
  "Company Website",
  "Other",
];

const WORK_MODES = ["Remote", "Hybrid", "Onsite"];

const PRIORITIES = ["Low", "Medium", "High"];

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    platform: {
      type: String,
      enum: PLATFORMS,
      required: true,
    },

    jobUrl: {
      type: String,
      trim: true,
      default: "",
    },

    appliedDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: STATUS,
      default: "Wishlist",
    },

    salary: {
      type: String,
      trim: true,
      default: "",
    },

    workMode: {
      type: String,
      enum: WORK_MODES,
      default: "Remote",
    },

    referral: {
      type: Boolean,
      default: false,
    },

    resumeVersion: {
      type: String,
      trim: true,
      default: "",
    },

    priority: {
      type: String,
      enum: PRIORITIES,
      default: "Medium",
    },

    interviewDate: {
      type: Date,
      default: null,
    },

    followUpDate: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;