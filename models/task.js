const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
class Task extends Model { }

Task.init(
    {
        task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        task_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        task_due: {
            type: DataTypes.DATEONLY,
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // foreignKey:
        },
        isCompleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
    }
);

module.exports = Task;