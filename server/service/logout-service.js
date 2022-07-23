const tokenService = require('../service/token-service')

class LogoutService {
  async logoutUser(refreshToken) {
    return await tokenService.deleteToken(refreshToken);

  }
}

module.exports = new LogoutService()