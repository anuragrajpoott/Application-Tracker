// src/utils/ApiResponse.js

class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = statusCode >= 200 && statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;

    if (data !== null) {
      this.data = data;
    }
  }
}

export default ApiResponse;