const router = require('express').Router();
const activateController = require('../controllers/activate-controller')

router.get('/activate/:linkActivate', activateController.activateUser)

module.exports = router