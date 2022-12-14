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

router.post('/forgot-password',
  body('email').isEmail(),
  authController.forgotPassword);

router.put('/reset-password/:resetToken',
  body('password').isLength({ min: 3, max: 32 }),
  authController.updatePassword)

router.get('/verify-email/:linkActivate', authController.activateUser)


// Social Login
router.post('/google-registration', authController.googleRegistration)
router.post('/google-login', authController.googleLogin)




module.exports = router;