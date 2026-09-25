const { StatusCodes } = require("http-status-codes");

const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST : /airplanes
 * req.body {modelNumber: "airbus380", capacity: 200}
 */
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    return res.status(StatusCodes.CREATED).json(SuccessResponse(airplane));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse(error, error.explanation || error.message));
  }
}

/**
 * GET : /airplanes
 * req.body {}
 */
async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirplanes();
    return res.status(StatusCodes.OK).json(SuccessResponse(airplanes));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse(error, error.explanation || error.message));
  }
}

/**
 * GET : /airplanes/:id
 * req.body {}
 */
async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    return res.status(StatusCodes.OK).json(SuccessResponse(airplane));
  } catch (error) {
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse(error, error.explanation || error.message));
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
};
