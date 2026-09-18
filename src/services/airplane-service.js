const { StatusCodes } = require("http-status-codes");

const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    console.log(error);
    if (error.name == "TypeError") {
      throw new AppError(
        "Cannot create a new Airplane object with the provided data",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    throw error;
  }
}

module.exports = {
  createAirplane,
};
