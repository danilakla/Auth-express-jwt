const router = require('express').Router();
const authController = require('../controllers/auth-controller')
const { body } = require('express-validator');


router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authController.registration);

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authController.login)

router.post('/forgotPassword',
  body('email').isEmail(),
  authController.forgotPassword);

router.put('/passwordReset/:resetToken',
  body('password').isLength({ min: 3, max: 32 }),
  authController.updatePassword)

router.get('/activate/:linkActivate', authController.activateUser)


// Social Login
router.post('/google-registration', authController.googleRegistration)
router.post('/google-login', authController.googleLogin)




module.exports = router;