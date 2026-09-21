const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        ErrorResponse(
          { modelNumber: "Model number is required" },
          "Model number is missing in the request body",
        ),
      );
  }
  next();
}

module.exports = {
  validateCreateRequest,
};
