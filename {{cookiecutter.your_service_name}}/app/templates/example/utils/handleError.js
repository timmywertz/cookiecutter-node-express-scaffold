const status = require('http-status');

function buildErrorResponseBody(err) {
  return {
    error: err.message,
    details: err.details || [],
  };
}

function handleError(err, req, res, next) {
  if (err) {
    const statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
    return res.status(statusCode).json(buildErrorResponseBody(err));
  }
  return next();
}

module.exports = handleError;
