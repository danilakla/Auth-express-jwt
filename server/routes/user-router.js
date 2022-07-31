const roleAuthMiddleware = require('../middleware/role-auth-middleware');
const authMiddleware = require('../middleware/auth-middleware');
const userController = require('../controllers/user-controller')

const router = require('express').Router();

router.get('/user/one', authMiddleware, userController.getUser)


router.get('/user/all', roleAuthMiddleware(['Admin']), userController.getUsers)


module.exports = router;