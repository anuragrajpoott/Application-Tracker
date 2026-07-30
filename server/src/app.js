// src/app.js

import express from "express";
import cors from "cors";
import morgan from "morgan";

import ApiError from "./utils/ApiError.js";
import ApiResponse from "./utils/ApiResponse.js";
import applicationRoutes from "./routes/application.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(200, "Server is running."));
});

app.use("/api/applications", applicationRoutes);

app.use((req, res, next) => {
  next(new ApiError(404, "Route not found."));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { errors: err.errors }),
  });
});

export default app;