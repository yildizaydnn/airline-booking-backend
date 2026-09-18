class AppError extends Error {
  constructor(message, statusCode) {
    super();
    this.statusCode = statusCode;
    this.explanation = message;
  }
}

module.exports = AppError;
