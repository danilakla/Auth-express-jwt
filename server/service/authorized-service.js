const ApiError = require('../util/api-error');
const tokenService = require('./token-service')
const userModel = require('../models/User-schema');

class AuthorizedService {
  async logoutUser(refreshToken) {
    return await tokenService.deleteToken(refreshToken);

  }
  async refresh(refreshToken) {

    const userData = await tokenService.validationRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw  ApiError.unAuthorizedError()
    }
    const user = await userModel.findOne({ _id: userData.id })
    const playloadAndTokens = await tokenService.initializationTokens(user)
    return playloadAndTokens;
  }
}

module.exports = new AuthorizedService()