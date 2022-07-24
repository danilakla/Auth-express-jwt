const ApiError = require('./api-error');
const tokenService = require('../service/token-service');
module.exports = function (authorizationHeader) {
  if (!authorizationHeader) {
    throw ApiError.unAuthorizedError()

  }
  console.log(1);
  const accessToken = authorizationHeader.split(' ')[1]
  if (!accessToken) {
    throw ApiError.unAuthorizedError()

  }
  const userData = tokenService.validationAccessToken(accessToken)
  console.log(userData);
  if (!userData) {
    throw ApiError.unAuthorizedError()
  }
  console.log(3);
  return userData
}