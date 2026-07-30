// src/controllers/application.controller.js

import Application from "../models/application.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getApplications = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status,
    platform,
    workMode,
    priority,
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

  if (status) filter.status = status;
  if (platform) filter.platform = platform;
  if (workMode) filter.workMode = workMode;
  if (priority) filter.priority = priority;

  const sortOptions = {
    newest: { appliedDate: -1 },
    oldest: { appliedDate: 1 },
    companyAsc: { company: 1 },
    companyDesc: { company: -1 },
    updated: { updatedAt: -1 },
    deadline: { deadline: 1 },
  };

  const currentPage = Number(page);
  const pageSize = Number(limit);

  const [applications, total] = await Promise.all([
    Application.find(filter)
      .sort(sortOptions[sort] || sortOptions.newest)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize),

    Application.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, "Applications fetched successfully.", {
      applications,
      pagination: {
        page: currentPage,
        limit: pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
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
    new ApiResponse(200, "Application deleted successfully.", {
      message: "Application deleted successfully.",
    })
  );
});