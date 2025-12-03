const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Query = sequelize.define('Query', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'queries',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

module.exports = Query;
