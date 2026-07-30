// src/utils/ApiError.js

class ApiError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);

    this.name = "ApiError";
    this.success = false;
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;