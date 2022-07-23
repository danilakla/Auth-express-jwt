const router = require('express').Router();


router.post('/registrations', authController.registration);

router.post('/login', authController.login)

router.post('/forgotPassword', authController.forgotPassword);

router.put('/passwordReset/:resetToken', authController.updatePassword)


module.exports = router;