const authorizedController = require('../controllers/authorized-controller');
const authMiddleware = require('../middleware/auth-middleware')
const router = require('express').Router();

router.put('/refresh', authorizedController.refresh)
router.delete('/logout', authMiddleware, authorizedController.logoutUser)

module.exports = router;