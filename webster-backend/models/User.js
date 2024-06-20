const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    profile_image: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: false
});

module.exports = User;