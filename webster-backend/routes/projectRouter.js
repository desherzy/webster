const Router = require('express').Router;
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.get('/', authMiddleware, projectController.getUserProjects);
router.post('/',authMiddleware, projectController.createProject);
router.post('/save/:id', authMiddleware, projectController.saveProject);
router.delete('/:id',authMiddleware, projectController.deleteProject);
router.patch('/:id', authMiddleware, projectController.renameProject);

module.exports = router;