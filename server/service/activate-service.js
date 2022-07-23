const userModel = require('../models/User-schema')
const ApiError = require('../util/api-error');
class ActivateService {
  async activateUser(activationLink) {

    const user = await userModel.findOne({ activationLink })
    console.log(user);

    if (!user) {
      throw ApiError.unAuthorizedError()
    }

    user.isActivated = true;
    console.log(321);
    await user.save();
    return null;
  }
}


module.exports = new ActivateService()
