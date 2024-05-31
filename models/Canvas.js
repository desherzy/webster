const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConfig');
const User = require('./User');

const Canvas = sequelize.define('Canvas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.JSON
    }
}, {
    tableName: 'canvas',
    timestamps: true
});

module.exports = Canvas;