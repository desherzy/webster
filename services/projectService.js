const ApiError = require('../exceptions/apiError');
const Canvas = require('../models/Canvas');

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
        const project = await Canvas.findOne({where: {id: id}});
        if (!project) {
            throw ApiError.badRequest('Project exists');
        }
        await Canvas.destroy({where: {id: id}});
    }

    async renameProject(id, newName) {
        const project = await Canvas.findOne({where: {id: id}});
        if (!project) {
            throw ApiError.badRequest('Project not found');
        }

        if (newName) {
            project.name = newName;
            await project.save();
            return project;
        }
    }

    async saveProject(projectId, userId, content) {
        try {
            const project = await Canvas.findOne({where: {id: projectId, owner_id: userId}});
            if (!project) {
                throw ApiError.badRequest('Project not found');
            }

            if (content) {
                project.content = content;
                await project.save();
                return project;
            }
        } catch (error) {
            console.error('Error saving project', error);
            throw error;
        }
    }

    async isUserAuthor(projectId, userId) {
            const project = await Canvas.findOne({where: {id: projectId}});
            return project.owner_id === userId;
    }
}

module.exports = new ProjectService();