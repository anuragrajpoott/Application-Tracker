import { body } from "express-validator";
import validate from "../middleware/validate.js";

const STATUS = [
  "Wishlist",
  "Applied",
  "OA Received",
  "OA Cleared",
  "Interview Scheduled",
  "Offer",
  "Rejected",
  "Ghosted",
];

const PLATFORMS = [
  "LinkedIn",
  "Naukri",
  "Instahyre",
  "Wellfound",
  "Cutshort",
  "Referral",
  "Company Website",
  "Other",
];

const WORK_MODES = ["Remote", "Hybrid", "Onsite"];

const PRIORITIES = ["Low", "Medium", "High"];

export const createApplicationValidator = [
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required."),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required."),

  body("platform")
    .isIn(PLATFORMS)
    .withMessage("Invalid platform."),

  body("status")
    .optional()
    .isIn(STATUS)
    .withMessage("Invalid status."),

  body("workMode")
    .optional()
    .isIn(WORK_MODES)
    .withMessage("Invalid work mode."),

  body("priority")
    .optional()
    .isIn(PRIORITIES)
    .withMessage("Invalid priority."),

  body("jobUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid job URL."),

  body("appliedDate")
    .notEmpty()
    .withMessage("Applied date is required.")
    .isISO8601()
    .withMessage("Invalid applied date."),

  body("interviewDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid interview date."),

  body("followUpDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid follow-up date."),

  body("referral")
    .optional()
    .isBoolean()
    .withMessage("Referral must be true or false."),

  validate,
];

export const updateApplicationValidator = [
  body("company")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Company name cannot be empty."),

  body("role")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Role cannot be empty."),

  body("platform")
    .optional()
    .isIn(PLATFORMS)
    .withMessage("Invalid platform."),

  body("status")
    .optional()
    .isIn(STATUS)
    .withMessage("Invalid status."),

  body("workMode")
    .optional()
    .isIn(WORK_MODES)
    .withMessage("Invalid work mode."),

  body("priority")
    .optional()
    .isIn(PRIORITIES)
    .withMessage("Invalid priority."),

  body("jobUrl")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Invalid job URL."),

  body("appliedDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid applied date."),

  body("interviewDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid interview date."),

  body("followUpDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Invalid follow-up date."),

  body("referral")
    .optional()
    .isBoolean()
    .withMessage("Referral must be true or false."),

  validate,
];