const userService = require('../service/user-service')
const ApiError = require('../util/api-error');

class UserController {

  async getUser(req, res, next) {
    try {
      const user = await userService.findUser(req.user.id)
      if (!user) {
        throw ApiError.badRequestError("Problem with connecting to the database")
      }
      res.json(user);
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.findUsers()
      if (!users) {
        throw ApiError.badRequestError("Problem with connecting to the database")
      }
      res.json(users);
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new UserController()
