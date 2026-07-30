// src/models/application.model.js

import mongoose from "mongoose";
import {
  APPLICATION_STATUS,
  APPLICATION_PLATFORMS,
  WORK_MODES,
  EMPLOYMENT_TYPES,
  PRIORITIES,
  CURRENCIES,
} from "../constants/application.constants.js";

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

    status: {
      type: String,
      enum: APPLICATION_STATUS,
      default: "Applied",
    },

    platform: {
      type: String,
      enum: APPLICATION_PLATFORMS,
      default: "Company Website",
    },

    workMode: {
      type: String,
      enum: WORK_MODES,
      default: "Hybrid",
    },

    employmentType: {
      type: String,
      enum: EMPLOYMENT_TYPES,
      default: "Full-time",
    },

    priority: {
      type: String,
      enum: PRIORITIES,
      default: "Medium",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    salary: {
      type: Number,
      min: 0,
      default: null,
    },

    currency: {
      type: String,
      enum: CURRENCIES,
      default: "INR",
    },

    jobUrl: {
      type: String,
      trim: true,
      default: "",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    deadline: {
      type: Date,
      default: null,
    },

    referred: {
      type: Boolean,
      default: false,
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

applicationSchema.index({ createdAt: -1 });

const Application = mongoose.model("Application", applicationSchema);

export default Application;