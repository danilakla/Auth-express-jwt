const userModel = require('../models/User-schema')
class UserService {

  async findUser(UserId) {
    return await userModel.findById(UserId)

  }

  async findUsers() {
    return await userModel.find()

  }

}

module.exports = new UserService()
