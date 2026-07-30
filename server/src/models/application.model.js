// src/models/application.model.js

import mongoose from "mongoose";
import {
  APPLICATION_PLATFORMS,
  APPLICATION_STATUS,
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
      default: "LinkedIn",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    followUpDate: {
      type: Date,
      default: () => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date;
      },
    },

    referred: {
      type: Boolean,
      default: false,
    },

    jobUrl: {
      type: String,
      trim: true,
      default: "",
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

applicationSchema.index({ appliedDate: -1 });

const Application = mongoose.model("Application", applicationSchema);

export default Application;