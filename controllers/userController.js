const userService = require("../services/userService");
const fs = require('fs');
const path = require('path');
const ApiError = require('../exceptions/apiError');

class UserController {
    async getUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await userService.getUser(id);
            res.json(user);
        } catch(e) {
            next(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            const userId = req.user.id;
            const updatedFields = req.body;

            if (!userId || !updatedFields) {
                throw ApiError.badRequest('Invalid update data');
            }
            const updatedUser = await userService.updateUser(userId, updatedFields);
            res.json(updatedUser);
        } catch(e) {
            next(e);
        }
    }

    async uploadUsersAvatar(req, res, next) {
        try {
            const userId = req.user.id;
            const { photo } = req.files;

            if (!photo) {
                return res.status(400).json({ message: 'Photo is required' });
            }
            const uploadDir = path.join(__dirname, '../usersAvatars');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            const randomChars = Array.from({ length: 7 }, () => 
                String.fromCharCode(Math.floor(Math.random() * 26) + 97)
                ).join('');

            const fileName = `${userId}_${randomChars}.png`;
            const filePath = path.join(uploadDir, fileName);
            await photo.mv(filePath);
            const imageUrl = `${process.env.API_URL}/usersAvatars/${fileName}`;
            console.log(imageUrl)
            const updatedUser = await userService.uploadUserPhoto(userId, imageUrl);
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }

    async deleteUsersAvatar(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await userService.deleteUserPhoto(userId);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.user.id;
            await userService.deleteUser(userId);
            res.status(200).json({ message: 'User is successfully removed' });
        } catch(e) {
            next(e);
        }
    }

    async changePass(req, res, next) {
        try {
            const userId = req.user.id;
            const passwords = req.body;
            await userService.changePass(userId, passwords);
            res.status(200).json({ message: 'Password is changed' });
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new UserController();