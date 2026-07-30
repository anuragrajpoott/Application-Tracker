// src/controllers/application.controller.js

import Application from "../models/application.model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getApplications = asyncHandler(async (req, res) => {
  const {
    search = "",
    status,
    platform,
    sort = "newest",
  } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { company: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    filter.status = status;
  }

  if (platform) {
    filter.platform = platform;
  }

  const sortOptions = {
    newest: { appliedDate: -1 },
    oldest: { appliedDate: 1 },
    companyAsc: { company: 1 },
    companyDesc: { company: -1 },
    followUp: { followUpDate: 1 },
    updated: { updatedAt: -1 },
  };

  const applications = await Application.find(filter).sort(
    sortOptions[sort] || sortOptions.newest
  );

  res.status(200).json(
    new ApiResponse(200, "Applications fetched successfully.", {
      applications,
    })
  );
});

export const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    throw new ApiError(404, "Application not found.");
  }

  res.status(200).json(
    new ApiResponse(200, "Application fetched successfully.", {
      application,
    })
  );
});

export const createApplication = asyncHandler(async (req, res) => {
  const application = await Application.create(req.body);

  res.status(201).json(
    new ApiResponse(201, "Application created successfully.", {
      application,
    })
  );
});

export const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!application) {
    throw new ApiError(404, "Application not found.");
  }

  res.status(200).json(
    new ApiResponse(200, "Application updated successfully.", {
      application,
    })
  );
});

export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findByIdAndDelete(req.params.id);

  if (!application) {
    throw new ApiError(404, "Application not found.");
  }

  res.status(200).json(
    new ApiResponse(200, "Application deleted successfully.")
  );
});