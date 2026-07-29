import { Router } from "express";

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

const router = Router();

router
  .route("/")
  .get(getApplications)
  .post(createApplicationValidator, createApplication);

router
  .route("/:id")
  .get(getApplicationById)
  .put(updateApplicationValidator, updateApplication)
  .delete(deleteApplication);

export default router;