const paymentService = require('../service/payment-service')
class PaymentController {

  async getSession(req, res, next) {
    try {
      const session = await paymentService.findSession();
      res.send({ url: session });
    } catch (error) {
      next(error)
    }
  }



}

module.exports = new PaymentController()
