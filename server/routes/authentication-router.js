const router = require('express').Router();
const authController = require('../controllers/auth-controller')

router.post('/registration', authController.registration);

router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword);

router.put('/passwordReset/:resetToken', authController.updatePassword)

// Social Login
router.post('/google_login', authController.googleLogin)



module.exports = router;