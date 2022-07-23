const authorizedController = require('../controllers/authorized-controller');

const router = require('express').Router();

router.put('/refresh',authorizedController.refresh)
router.delete('/logout', authorizedController.logoutUser)

module.exports = router;