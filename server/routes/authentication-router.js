const router = require('express').Router();
const authController = require('../controllers/auth-controller')


router.post('/registration', authController.registration);

router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword);

router.put('/passwordReset/:resetToken', authController.updatePassword)

router.get('/activate/:linkActivate', authController.activateUser)


// Social Login
router.post('/google-registration', authController.googleRegistration)
router.post('/google-login', authController.googleLogin)

router.post('/facebook_login', authController.facebookLogin)



module.exports = router;