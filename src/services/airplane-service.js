const { StatusCodes } = require("http-status-codes");

const { Logger } = require("../config");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    Logger.error(`createAirplane failed: ${error.name} - ${error.message}`);

    // Model dogrulamasi (allowNull, validate) basarisiz -> istemcinin hatasi
    if (error.name === "SequelizeValidationError") {
      const explanation = error.errors.map((err) => err.message);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    // Tanimadigimiz her sey -> sunucu hatasi
    throw new AppError(
      "Cannot create a new Airplane object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createAirplane,
};
