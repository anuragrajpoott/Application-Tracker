// src/validators/application.validator.js

import { body } from "express-validator";
import validate from "../middleware/validate.js";
import {
  APPLICATION_STATUS,
  APPLICATION_PLATFORMS,
  WORK_MODES,
  EMPLOYMENT_TYPES,
  PRIORITIES,
  CURRENCIES,
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

  body("workMode")
    .optional()
    .isIn(WORK_MODES)
    .withMessage("Invalid work mode."),

  body("employmentType")
    .optional()
    .isIn(EMPLOYMENT_TYPES)
    .withMessage("Invalid employment type."),

  body("priority")
    .optional()
    .isIn(PRIORITIES)
    .withMessage("Invalid priority."),

  body("currency")
    .optional()
    .isIn(CURRENCIES)
    .withMessage("Invalid currency."),

  body("location")
    .optional()
    .trim(),

  body("salary")
    .optional({ values: "falsy" })
    .isFloat({ min: 0 })
    .withMessage("Salary must be a positive number."),

  body("jobUrl")
    .optional({ values: "falsy" })
    .isURL()
    .withMessage("Invalid job URL."),

  body("appliedDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid applied date."),

  body("deadline")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Invalid deadline."),

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