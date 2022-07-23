const logoutController = require('../controllers/logout-controller');

const router = require('express').Router();

router.delete('/logout', logoutController.logoutUser)

module.exports = router;