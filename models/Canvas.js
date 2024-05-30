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
    content: {
        type: DataTypes.JSON
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'canvas',
    timestamps: false
});

module.exports = Canvas;