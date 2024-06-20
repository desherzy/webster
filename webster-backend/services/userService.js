const User = require('../models/User');
const UserDto = require('../dtos/UserDto');
const ApiError = require('../exceptions/apiError');
const Links = require('../models/Links');
const Tokens = require('../models/Tokens');
const bcrypt = require('bcrypt');

class UserService {
    async getUser(id) {
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            const userDto = new UserDto(user);
            return userDto;
          } else {
            throw ApiError.badRequest('User not found'); 
          }
        } catch (error) {
          throw error;
        }
    }

    async updateUser(id, updatedFields) {
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            throw ApiError.badRequest('User not found'); 
          }

          if (updatedFields.username) {
            user.username = updatedFields.username;
          }
          if (updatedFields.email) {
            user.email = updatedFields.email;
          }

          await user.save();

          const userDto = new UserDto(user);
          return userDto;
        } catch (error) {
          throw error;
        }
    }

    async deleteUser(id) { 
        try {
          const user = await User.findAll({where: {id: id}});
          if (!user) {
            throw ApiError.badRequest('User exists');
          } else {
            await Links.destroy({where: {user_id: id}});
            await Tokens.destroy({where: {user_id: id}});
            await User.destroy({where: {id: id}});
            console.log('User[' + id + '] deleted');
          }
        } catch (error) {
          console.error('Error deliting user:', error);
          throw error;
        }
    }

    async uploadUserPhoto(id, photoPath) {
        try {
          const user = await User.findOne({where: {id: id}});

          if (!user) {
            throw ApiError.badRequest('User not found'); 
          }
          if (photoPath) {
            user.profile_image = photoPath;
          }

          await user.save();
          const userDto = new UserDto(user);

          return userDto;
        } catch (error) {
          throw error;
        }
    }

    async deleteUserPhoto(id) {
        try {
          const user = await User.findOne({where: {id: id}});
          if (!user) {
            throw ApiError.badRequest('User not found'); 
          } else {
            user.profileImage = null;
            await user.save();
            const userDto = new UserDto(user);
            return userDto;
          }
        } catch (error) {
          throw error;
        }
    }

    async changePass(id, passwords) {
        try {
          const user = await User.findOne({where: {id: id}});
          
          if (!user) {
            throw ApiError.badRequest('User not found'); 
          }
  
          let hashedOldPassword = await bcrypt.hash(passwords.oldPassword, 3);
  
          if (user.password != hashedOldPassword) {
            throw ApiError.badRequest('Passwords not matched');
          } else {
            let hashedNewPassword = await bcrypt.hash(passwords.newPassword, 3);
            user.password = hashedNewPassword;
            await user.save();
          }
        } catch (error) {
          throw error;
        }
    }
}

module.exports = new UserService();
