const ApiError = require("../util/api-error");
const checkTokenHeader = require('../util/checkAccessTokeHeaders');

module.exports = function (accessRoles) {
  console.log(1);
  return function (req, res, next) {
    try {
      const authorizationHeader = req.headers.authorization;

      const userPayload = checkTokenHeader(authorizationHeader)
      let hasRole = false;
      userPayload.roles.forEach(element => {
        if (accessRoles.includes(element)) {
          return hasRole = true;
        }
      });

      if (!hasRole) {
        throw next(ApiError.unAuthorizedError())

      }
      req.user = userPayload
      next()
    } catch (error) {
      throw next(error)

    }

  }
}
