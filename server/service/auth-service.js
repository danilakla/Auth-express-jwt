const userModel = require('../models/User-schema');
const ApiError = require('../util/api-error');
const tokenService = require('../service/token-service');
const mailService = require('./mail-service');
const crypto = require('crypto');
class AuthService {
  async registration(email, password) {
    const emailAlreadyExists = await userModel.findOne({ email });
    if (emailAlreadyExists) {
      throw ApiError.badRequestError('user with such email already exists')
    }

    // first registered user is an admin
    const isFirstAccount = (await userModel.countDocuments({})) === 0;
    const role = isFirstAccount ? 'Admin' : 'User';

    const user = await userModel.create({ email, password, roles: role });
    await mailService.sendActivationOnEmail(email, `${process.env.API_URL}api/verify-email/${user.activationLink}`);
    const playloadAndTokens = await tokenService.initializationTokens(user)
    return playloadAndTokens
  }

  async login(email, password) {

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      throw ApiError.badRequestError('user with such email does not found')
    }
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) {
      throw ApiError.badRequestError('password does not match');
    }
    const playloadAndTokens = await tokenService.initializationTokens(user)
    return playloadAndTokens
  }
  async activateUser(activationLink) {

    const user = await userModel.findOne({ activationLink })

    if (!user) {
      throw ApiError.unAuthorizedError()
    }

    user.isActivated = true;
    await user.save();
    return null;
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
      throw ApiError.badRequestError('user with such token does not found, send your email again ');
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return user;
  }
  async getResetTokenPassword(email) {
    const user = await userModel.findOne({ email })
    if (!user) {
      throw ApiError.badRequestError('user with such email does not found')
    }
    const resetToken = await user.getResetTokenPassword()
    await user.save();
    await mailService.sendActivationOnEmail(email, `${process.env.HOST_CLIENT}login/${resetToken}`);

    return resetToken

  }
  async setRefreshTokenInCookie() {
    return
  }
}

module.exports = new AuthService();