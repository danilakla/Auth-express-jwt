const userModel = require('../models/User-schema');
const ApiError = require('../util/api-error');
const UserDTO = require('../DTO/user-payload')
class AuthService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new ApiError.badRequestError('user with such email already exists')
    }
    const user = await userModel.create({ email, password });
    await mailService.sendActivationOnEmail(email, `${process.env.API_URL}/api/activate/${user.activationLink}`);
    const payLoad = new UserDTO(user);
    const tokens = await tokenService.generateTokens({ ...payLoad });
    const refreshToken = await tokenService.saveToken(userID, tokens.refreshToken)


  }
}

module.exports = new AuthService();