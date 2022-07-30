const router = require('express').Router();
const paymentController = require('../controllers/payment-controller')
const authMiddleware = require('../middleware/auth-middleware')

router.post('/create-checkout-session', authMiddleware, paymentController.getSession);
module.exports = router