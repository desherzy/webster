const ApiError = require('../exceptions/apiError');
const Canvas = require('../models/Canvas');
const CanvasDto = require('../dtos/CanvasDto');

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
        try {
            const project = await Canvas.findAll({where: {id: id}});
            if (!project) {
                throw ApiError.badRequest('Project exists');
            }

            if (isUserAuthor(id, userId)) {
                await Canvas.destroy({where: {id: id}});
                console.log('Project[' + id + '] deleted');
            } else {
                throw ApiError.forbidden('Access denied');
            }
        } catch (error) {
            console.error('Error deliting project:', error);
            throw error;
        }
    }

    async renameProject(id, newName) {
        try {
            const project = await Canvas.findOne({where: {id: id}});
            if (!project) {
                throw ApiError.badRequest('Project not found');
            }

            if (newName) {
                project.name = newName;
                await project.save();
                const CanvasDto = new CanvasDto(project);
                return CanvasDto;
            }
        } catch (error) {
            throw error;
        }
    }

    async saveProject(projectId, userId, content) {
        try {
            const project = await Canvas.findAll({where: {id: projectId, owner_id: userId}});
            if (!project) {
                throw ApiError.badRequest('Project not found');
            }

            if (content) {
                project.content = content;
                await project.save();
                const CanvasDto = new CanvasDto(project);
                return CanvasDto;
            }
        } catch (error) {
            console.error('Error saving project', error);
            throw error;
        }
    }

    async isUserAuthor(projectId, userId) {
        try {
            const project = await Canvas.findAll({where: {id: projectId}});
            if (project.owner_id = userId) {
                return true;
            } else {
                return false;
            }
        } catch {error} {
            throw error;
        }
    }
}

module.exports = new ProjectService();