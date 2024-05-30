const Router = require('express').Router;
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.get('/:id', userController.getUser);
router.patch('/update', authMiddleware, userController.updateUser);
router.patch('/avatar', authMiddleware, userController.uploadUsersAvatar);
router.delete('/avatar', authMiddleware, userController.deleteUsersAvatar);
router.post('/changepass', authMiddleware, userController.changePass);
router.delete('/', authMiddleware, userController.deleteUser);

module.exports = router;