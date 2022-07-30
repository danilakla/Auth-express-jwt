const ApiError = require('./api-error');
const tokenService = require('../service/token-service');
module.exports = function (authorizationHeader) {
  if (!authorizationHeader) {
    throw ApiError.unAuthorizedError()

  }
  const accessToken = authorizationHeader.split(' ')[1]
  if (!accessToken) {
    throw ApiError.unAuthorizedError()

  }
  const userData = tokenService.validationAccessToken(accessToken)
  if (!userData) {
    throw ApiError.unAuthorizedError()
  }
  return userData
}