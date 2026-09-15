const { StatusCodes } = require("http-status-codes");

const { AirplaneService } = require("../services");

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created a new airplane",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Not able to create a new airplane",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
};
