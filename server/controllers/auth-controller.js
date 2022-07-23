const authService = require('../service/auth-service')
class AuthController {

  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(1);
      const userData = await authService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //  30 days 
        httpOnly: true,
      });
      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      res.json(userData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  

}
module.exports = new AuthController();