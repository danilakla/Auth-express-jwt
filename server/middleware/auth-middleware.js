
const ApiError = require('../util/api-error')
const checkTokenHeader = require('../util/checkAccessTokeHeaders');
module.exports = function (req, res, next) {
  try {

    const authorizationHeader = req.headers.authorization;
    const userPayload = checkTokenHeader(authorizationHeader)
    req.user = userPayload

    next()

  } catch (error) {
    throw next(ApiError.unAuthorizedError())
  }


}