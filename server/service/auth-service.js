const userModel = require('../models/User-schema');
const ApiError = require('../util/api-error');
const UserDTO = require('../DTO/user-payload');
const tokenService = require('../service/token-service');
const mailService = require('../service/mail-service');
const crypto = require('crypto');
class AuthService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new ApiError.badRequestError('user with such email already exists')
    }
    const user = await userModel.create({ email, password, roles: "User" });
    await mailService.sendActivationOnEmail(email, `${process.env.API_URL}api/activate/${user.activationLink}`);
    const playloadAndTokens = await tokenService.initializationTokens(user)
    return playloadAndTokens
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
    const playloadAndTokens = await tokenService.initializationTokens(user)
    return playloadAndTokens
  }
  async update(password, resetPasswordToken) {

    const hashToken = crypto
      .createHash("sha256")
      .update(resetPasswordToken)
      .digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken: hashToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      throw new ApiError.badRequestError('user with such token does not found');
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return user;
  }
  async getResetTokenPassword(email) {
    const candidate = await userModel.findOne({ email })
    if (!candidate) {
      throw new ApiError.unAuthorizedError();
    }
    const resetToken = await candidate.getResetTokenPassword()
    await candidate.save();
    await mailService.sendActivationOnEmail(email, `${process.env.API_URL}api/passwordReset/${resetToken}`);

    return resetToken

  }
  async setRefreshTokenInCookie() {
return 
  }
}

module.exports = new AuthService();