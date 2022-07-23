const logoutService = require('../service/logout-service');

class LogoutController {
  async logoutUser(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await logoutService.logoutUser(refreshToken);

      res.clearCookie('refreshToken');

      res.status(200).json('success')
    } catch (error) {
      next(error);
    }
  }
}


module.exports = new LogoutController();