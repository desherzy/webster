const Canvas = require('../models/Canvas')

class ProjectService {
    async getUserProjects(userId) {
        const projects = await Canvas.findAll({ where: { owner_id: userId } })

        return projects;
    }

    async createProject(userId, name, height, width) {
        const project = await Canvas.create({
            name: name,
            height: height,
            width: width,
            owner_id: userId
        });

        return project;
    }

    async deleteProject(id, userId) {

    }

    async renameProject(id, newName) {

    }

    async saveProject(projectId, userId, content) {

    }
}

module.exports = new ProjectService();