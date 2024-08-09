const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require('./user');

class Project extends Model {}

Project.init(
    {
        
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
    }
);

module.exports = Project;
