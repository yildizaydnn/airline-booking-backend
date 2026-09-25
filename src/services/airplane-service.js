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

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    Logger.error(`getAirplanes failed: ${error.name} - ${error.message}`);

    throw new AppError(
      "Cannot fetch data of all the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);

    return airplane;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested Airplane is not available",
        StatusCodes.NOT_FOUND,
      );
    }
    Logger.error(`getAirplane failed: ${error.name} - ${error.message}`);

    throw new AppError(
      "Cannot fetch data of the specified Airplane",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The requested Airplane is not available",
        StatusCodes.NOT_FOUND,
      );
    }
    Logger.error(`destroyAirplane failed: ${error.name} - ${error.message}`);
    throw new AppError(
      "Cannot delete the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
};
