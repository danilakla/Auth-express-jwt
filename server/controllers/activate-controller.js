const activationService = require('../service/activate-service')
class ActivateController {

  async activateUser(req, res, next) {
    try {

      const activationLink = req.params.linkActivate;

      await activationService.activateUser(activationLink);
  
      return res.redirect('http://localhost:3000/')
    } catch (error) {
      console.log(error);
      next(error)
    }



  }
}

module.exports = new ActivateController()
