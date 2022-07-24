const userModel = require('../models/User-schema')
const ApiError = require('../util/api-error');
class ActivateService {
  async activateUser(activationLink) {

    const user = await userModel.findOne({ activationLink })

    if (!user) {
      throw ApiError.unAuthorizedError()
    }

    user.isActivated = true;
    await user.save();
    return null;
  }
}


module.exports = new ActivateService()
