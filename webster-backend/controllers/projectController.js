const projectService = require('../services/projectService');


class ProjectController {

    async createProject(req, res, next) {
        try {
            const { name, height, width } = req.body;
            const userId = req.user.id;

            const project = await projectService.createProject(userId, name, height, width);

            return res.json(project);
        } catch(e) {
            next(e);
        }
    }

    async getUserProjects(req, res, next) {
        try {
            const userId = req.user.id;

            const projects = await projectService.getUserProjects(userId);

            return res.json(projects);
        } catch(e) {
            next(e);
        }
    }

    async renameProject(req, res, next) {
        try {
            const { newName } = req.body;
            const id = req.params.id;
            const userId = req.user.id;

            const project = await projectService.renameProject(id, newName, userId);

            return res.json(project);
        } catch(e) {
            next(e);
        }
    }

    async deleteProject(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.user.id;

            await projectService.deleteProject(id, userId);

            res.status(200).json({ message: 'Project is successfully removed' });
        } catch(e) {
            next(e);
        }
    }

    async saveProject(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.user.id;
            const { contentJson } = req.body;

            await projectService.saveProject(id, userId, contentJson);

            res.status(200).json({ message: 'Project is successfully saved' });
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new ProjectController();