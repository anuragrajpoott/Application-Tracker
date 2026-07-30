// src/middleware/validate.js

import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

const validate = (req, res, next) => {
  const { array, isEmpty } = validationResult(req);

  if (!isEmpty()) {
    const [{ msg }] = array({ onlyFirstError: true });
    return next(new ApiError(400, msg));
  }

  next();
};

export default validate;