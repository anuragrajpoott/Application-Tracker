// src/routes/application.routes.js

import { Router } from "express";
import { param } from "express-validator";

import {
  createApplication,
  deleteApplication,
  getApplicationById,
  getApplications,
  updateApplication,
} from "../controllers/application.controller.js";

import {
  createApplicationValidator,
  updateApplicationValidator,
} from "../validators/application.validator.js";

import validate from "../middleware/validate.js";

const router = Router();

const validateApplicationId = [
  param("id").isMongoId().withMessage("Invalid application ID."),
  validate,
];

router
  .route("/")
  .get(getApplications)
  .post(createApplicationValidator, createApplication);

router
  .route("/:id")
  .all(validateApplicationId)
  .get(getApplicationById)
  .patch(updateApplicationValidator, updateApplication)
  .delete(deleteApplication);

export default router;