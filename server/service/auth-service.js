const userModel = require('../models/User-schema');
const ApiError = require('../util/api-error');
const UserDTO = require('../DTO/user-payload');
const tokenService = require('../service/token-service');
const mailService = require('../service/mail-service');
class AuthService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new ApiError.badRequestError('user with such email already exists')
    }
    const user = await userModel.create({ email, password });
    console.log(2);

    await mailService.sendActivationOnEmail(email, `${process.env.API_URL}api/activate/${user.activationLink}`);

    const payLoad = new UserDTO(user);
    const tokens = await tokenService.generateTokens({ ...payLoad });

    await tokenService.saveToken(payLoad.id, tokens.refreshToken)
    return {
      ...tokens,
      user: payLoad
    }

  }

  async login(email, password) {

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError.badRequestError('user with such email does not found')
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new ApiError.badRequestError('password does not match');
    }
    const payload = new UserDTO(user);
    const tokens = await tokenService.generateTokens({ ...payload })
    await tokenService.saveToken(payload.id, tokens.refreshToken)
    return {
      ...tokens,
      user: payload
    }
  }
}

module.exports = new AuthService();