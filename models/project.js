const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require('./user');

class Project extends Model {}

Project.init(
    {

        user_id: {
            type : DataTypes.INTEGER,
            references: {
                model : "user",
                key: "id"
              }
        },
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
        modelName : "project",
        freezeTableName: true
    }
);

module.exports = Project;
