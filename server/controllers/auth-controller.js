const authService = require('../service/auth-service');
const mailService = require('../service/mail-service');


////////////////////////////////////////////////////////////////////////
const userModel = require('../models/User-schema');
const tokenService = require('../service/token-service');

const { google } = require('googleapis');
const { OAuth2 } = google.auth
const client_id = '77144797068-s64eirkru9foga32she7mnlettoi7361.apps.googleusercontent.com'
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
  async activateUser(req, res, next) {
    try {

      const activationLink = req.params.linkActivate;

      await authService.activateUser(activationLink);

      return res.redirect('http://localhost:3000')
    } catch (error) {
      console.log(error);
      next(error)
    }



  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      const resetTokenPassword = await authService.getResetTokenPassword(email);
      res.json(resetTokenPassword)
    } catch (error) {
      next(error);
    }
  }
  async updatePassword(req, res, next) {
    console.log(123);
    try {

      const { password, tokenRes } = req.body;
      const userupdate = await authService.update(password, tokenRes)
      console.log(userupdate);
      return res.json('ok')

    } catch (error) {
      next(error);
    }
  }

  async googleLogin(req, res, next) {
    try {
      const { tokenId } = req.body
      const verify = await client.verifyIdToken({ idToken: tokenId, audience: client_id }) //mail 
      console.log(0)
      const { email_verified, email } = verify.payload
      const password = email + 'dasdas' //google secroe
      // const passwordHash = await bcrypt.hash(password, 12)

      if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

      const user = await userModel.findOne({ email }).select("+password");

      if (user) {
        console.log(123);
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

        const playloadAndTokens = await tokenService.initializationTokens(user)

        res.cookie('refreshToken', playloadAndTokens.refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.json({ token: playloadAndTokens.accessToken })
      } else {
        const newUser = await userModel.create({ email, password, roles: 'User' });
        await mailService.sendActivationOnEmail(email, `${process.env.API_URL}api/activate/${newUser.activationLink}`);

        const playloadAndTokens = await tokenService.initializationTokens(newUser)
        res.cookie('refreshToken', playloadAndTokens.refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.json({ token: playloadAndTokens.accessToken })
      }


    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }
  //in development
  async facebookLogin(req, res, next) {
    try {
      const { accessToken, userID } = req.body

      const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

      const data = await fetch(URL).then(res => res.json()).then(res => { return res })

      const { email, name, picture } = data

      const password = email + 'dasdas'
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

        res.json({ token: playloadAndTokens.accessToken })
      } else {
        const newUser = await userModel.create({ email, password, roles: 'User' });
        console.log(newUser);
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