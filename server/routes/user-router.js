const roleAuthMiddleware = require('../middleware/role-auth-middleware');
const authMiddleware = require('../middleware/auth-middleware');
const userController = require('../controllers/user-controller')

const router = require('express').Router();

router.get('/one', authMiddleware, userController.getUser)


router.get('/all', roleAuthMiddleware(['Admin']), userController.getUsers)


module.exports = router;