const ApiError = require('../util/api-error');

module.exports = function (error, req, res, next) {

  if (!error instanceof ApiError) {
    return res.status(500).json(error.message);
  }
  return res.status(error.status).json({
    message: error.message,
    error: error.errors,
  })
}