const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        ErrorResponse(
          new AppError(
            ["Model Number not found in the incoming request"],
            StatusCodes.BAD_REQUEST,
          ),
          "Something went wrong while creating airplane",
        ),
      );
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
