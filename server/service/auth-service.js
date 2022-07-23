const userModel = require('../models/User-schema');
const token = require('../models/RefreshToken-schema');
const ApiError = require('../util/api-error');

class AuthService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw new ApiError.badRequestError('user with such email already exists')
    }
    const user = await userModel.create({ email, password });
    await mailService.sendActivationOnEmail(email, `${process.env.API_URL}/api/activate/${user.activationLink}`);
    
  }
}

module.exports = new AuthService();