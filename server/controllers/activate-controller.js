const activationService = require('../service/activate-service')

class ActivateController {

  async activateUser(req, res, next) {
    try {

      const activationLink = req.params.linkActivate;

      await activationService.activateUser(activationLink);
      console.log(13312312312);
      return res.json('success')
    } catch (error) {
      console.log(error);
      next(error)
    }



  }
}

module.exports = new ActivateController()
