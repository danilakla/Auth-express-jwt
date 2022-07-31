const authService = require('../service/auth-service');
const validationBody = require('../util/validation-body')

////////////////////////////////////////////////////////////////////////
const { google } = require('googleapis');
const { OAuth2 } = google.auth
const client_id = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2(client_id)
////////////////////////////////////////////////////////////////////////

class AuthController {

  async registration(req, res, next) {
    try {
      if (!validationBody(req)) {
        res.json({ message: 'invalid data', error: true });
      }

      const { email, password } = req.body;
      const userData = await authService.registration(email, password);

      res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      if (!validationBody(req)) {
        res.json({ message: 'invalid data', error: true });
      }
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

      if (!validationBody(req)) {
        res.json({ message: 'invalid data', error: true });
      }

      const { email } = req.body;
      const resetTokenPassword = await authService.getResetTokenPassword(email);
      res.json(resetTokenPassword)
    } catch (error) {
      next(error);
    }
  }
  async updatePassword(req, res, next) {
    try {

      if (!validationBody(req)) {
        res.json({ message: 'invalid data', error: true });
      }

      const resetToken = req.params.resetToken
      console.log(resetToken);
      const { password } = req.body;
      await authService.update(password, resetToken)
      return res.json('ok')

    } catch (error) {
      next(error);
    }
  }

  async googleRegistration(req, res, next) {
    try {
      const { tokenId } = req.body
      const verify = await client.verifyIdToken({ idToken: tokenId, audience: client_id }) //mail 
      const { email_verified, email } = verify.payload
      const password = email + 'dasdas' //google 
      if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

      const userDataSignUp = await authService.registration(email, password);


      res.cookie('refreshToken', userDataSignUp.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //  30 days 
        httpOnly: true,
      });
      res.json(userDataSignUp);



    } catch (err) {
      next(err)

    }
  }


  async googleLogin(req, res, next) {
    try {
      const { tokenId } = req.body
      const verify = await client.verifyIdToken({ idToken: tokenId, audience: client_id }) //mail 
      const { email_verified, email } = verify.payload
      const password = email + 'dasdas' //google 
      if (!email_verified) return res.status(400).json({ msg: "Email verification failed." })

      const userDataSignUp = await authService.login(email, password);

      res.cookie('refreshToken', userDataSignUp.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000, //  30 days 
        httpOnly: true,
      });
      res.json(userDataSignUp);



    } catch (err) {
      next(err)
    }
  }

}
module.exports = new AuthController();