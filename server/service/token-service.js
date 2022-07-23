const jwt = require('jsonwebtoken')
const tokenModel = require('../models/RefreshToken-schema');
class TokenService {

  async generateTokens(payLoad) {
    const accessToken = jwt.sign(payLoad, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payLoad, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken

    }
  }

  async saveToken(userId, refreshToken) {
    const userToken = await tokenModel.findOne({ userId })
    if (userToken) {
      userToken.refreshToken = refreshToken;
      return userToken.save();
    }
    const refreshToken = await tokenMode.create({ userId, refreshToken })
    return refreshToken;

  }

}

module.exports = new TokenService();