const userService = require('../service/user-service')
class UserController {

  async getUser(req, res, next) {
    try {
      const user = await userService.findUser(req.user.id)
      res.json(user);
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.findUsers()
      res.json(users);
    } catch (error) {
      next(error)
    }
  }

}

module.exports = new UserController()
