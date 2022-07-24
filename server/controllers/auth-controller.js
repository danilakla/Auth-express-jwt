const authService = require('../service/auth-service');
const mailService = require('../service/mail-service');
class AuthController {

  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
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

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const resetTokenPassword = await authService.getResetTokenPassword(email);
      res.json(resetTokenPassword);
    } catch (error) {
      next(error);
    }
  }
  async updatePassword(req, res, next) {
    try {
      const resetTokenPassword = req.params.resetToken
      const { password } = req.body;
      const userupdate = await authService.update(password, resetTokenPassword)
      res.status(201).json({
        success: true,
        data: "Password Updated Success",
        userupdate
      });
    } catch (error) {
      next(error);
    }
  }


}
module.exports = new AuthController();