// src/validators/application.validator.js

import { body } from "express-validator";
import validate from "../middleware/validate.js";
import {
  APPLICATION_PLATFORMS,
  APPLICATION_STATUS,
} from "../constants/application.constants.js";

const companyValidation = (optional = false) => {
  const chain = body("company").trim();

  if (optional) {
    chain.optional();
  }

  return chain.notEmpty().withMessage("Company is required.");
};

const roleValidation = (optional = false) => {
  const chain = body("role").trim();

  if (optional) {
    chain.optional();
  }

  return chain.notEmpty().withMessage("Role is required.");
};

const applicationValidators = [
  body("status")
    .optional()
    .isIn(APPLICATION_STATUS)
    .withMessage("Invalid status."),

  body("platform")
    .optional()
    .isIn(APPLICATION_PLATFORMS)
    .withMessage("Invalid platform."),

  body("location")
    .optional()
    .trim(),

  body("jobUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Invalid job URL."),

  body("appliedDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid applied date."),

  body("followUpDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Invalid follow-up date."),

  body("referred")
    .optional()
    .isBoolean()
    .withMessage("Referred must be true or false."),

  body("notes")
    .optional()
    .trim(),
];

export const createApplicationValidator = [
  companyValidation(),
  roleValidation(),
  ...applicationValidators,
  validate,
];

export const updateApplicationValidator = [
  companyValidation(true),
  roleValidation(true),
  ...applicationValidators,
  validate,
];