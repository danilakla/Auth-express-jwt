const authService = require('../service/auth-service');
const mailService = require('../service/mail-service');


////////////////////////////////////////////////////////////////////////
const userModel = require('../models/User-schema');
const tokenService = require('../service/token-service');

const { google } = require('googleapis');
const userDto = require('../DTO/user-payload');
const { OAuth2 } = google.auth
const client_id = '543959122831-p0lud62rc95l6daf174aco57fkc2srt9.apps.googleusercontent.com'
const CLIENT_URL = 'http://localhost:3000'
const client = new OAuth2(client_id)
////////////////////////////////////////////////////////////////////////

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

  async googleLogin(req, res, next) {
    try {
      const { tokenId } = req.body

      const verify = await client.verifyIdToken({ idToken: tokenId, audience: client_id }) //mail 

      const { email_verified, email, name, picture } = verify.payload

      const password = email + 'dasdas' //google secroe

      // const passwordHash = await bcrypt.hash(password, 12)

      if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

      const user = await userModel.findOne({ email }).select("+password");

      if (user) {
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

        const playloadAndTokens = await tokenService.initializationTokens(user)

        res.cookie('refreshtoken', playloadAndTokens.refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        console.log(playloadAndTokens.accessToken);
        res.json({ token: playloadAndTokens.accessToken })
      } else {
        const newUser = await userModel.create({ email, password, });

        const playloadAndTokens = await tokenService.initializationTokens(newUser)
        res.cookie('refreshtoken', playloadAndTokens.refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.json({ token: playloadAndTokens.accessToken })
      }


    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
}
module.exports = new AuthController();