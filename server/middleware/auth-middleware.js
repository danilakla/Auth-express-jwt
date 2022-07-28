
const ApiError = require('../util/api-error')
const checkTokenHeader = require('../util/checkAccessTokeHeaders');
module.exports = function (req, res, next) {
  try {

    console.log('user role');
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader);
    const userPayload = checkTokenHeader(authorizationHeader)
    req.user = userPayload

    next()

  } catch (error) {
    throw next(ApiError.unAuthorizedError())
  }


}