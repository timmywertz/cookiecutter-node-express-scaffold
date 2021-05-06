/* eslint-disable max-classes-per-file */
class GenericError extends Error {
  constructor({ message, statusCode = 500, details = [] }) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

class BadRequestError extends GenericError {
  constructor(message, details) {
    super({ message, statusCode: 400, details });
  }
}

module.exports = { GenericError, BadRequestError };
