const jwt = require('jsonwebtoken')
const tokenModel = require('../models/RefreshToken-schema');
const 
class TokenService {

  async registrationAndCreationTokens() {
    const payload = new UserDTO(user);
    const tokens = await this.generateTokens({ ...payload })
    await this.saveToken(payload.id, tokens.refreshToken)
    return {
      ...tokens,
      user: payload
    }
  }
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
      console.log(refreshToken);
      userToken.refreshToken = refreshToken;
      return await userToken.save();
    }
    console.log(2);

    await tokenModel.create({ userId, refreshToken })


  }

  async deleteToken(refreshToken) {
    await tokenModel.findOneAndDelete({ refreshToken });

  }
  validationAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }

  validationRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (error) {
      return null

    }
  }




  async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken })
    return tokenData
  }

}

module.exports = new TokenService();