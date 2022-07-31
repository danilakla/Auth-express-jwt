const authorizedService = require('../service/authorized-service');
const ApiError = require('../util/api-error')

class AuthorizedController {
  async logoutUser(req, res, next) {
    try {

      const { refreshToken } = req.cookies;
      await authorizedService.logoutUser(refreshToken);
      res.clearCookie('refreshToken');

      res.status(200).json('success')
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw ApiError.badRequestError('not founded refresh token, pls log in again')
      }
      const userData = await authorizedService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      })
      return res.json(userData)

    } catch (error) {
      next(error);
    }
  }

}


module.exports = new AuthorizedController();