const logger = require('../lib/logger');

function logError(err, req, res, next) {
  logger.error(err.stack);
  next(err);
}

module.exports = logError;
