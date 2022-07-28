const authorizedController = require('../controllers/authorized-controller');
const roleAuthMiddleware = require('../middleware/role-auth-middleware');
const router = require('express').Router();

router.put('/refresh', authorizedController.refresh)
router.delete('/logout', roleAuthMiddleware(['User', 'Admin']), authorizedController.logoutUser)

module.exports = router;