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
        project_due: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
    }
);

module.exports = Project;