// src/app.js

import cors from "cors";
import express from "express";
import morgan from "morgan";

import applicationRoutes from "./routes/application.routes.js";
import ApiError from "./utils/ApiError.js";
import ApiResponse from "./utils/ApiResponse.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_, res) => {
  res.status(200).json(new ApiResponse(200, "Server is running."));
});

app.use("/api/applications", applicationRoutes);

app.use((_, __, next) => {
  next(new ApiError(404, "Route not found."));
});

app.use((err, _, res, __) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors:
      process.env.NODE_ENV === "production" ? undefined : err.errors,
  });
});

export default app;