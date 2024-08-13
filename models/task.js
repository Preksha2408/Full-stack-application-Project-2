const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class Task extends Model {}

Task.init(
  {
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model : "project",
        key : "id"
      }
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model : "user",
        key: "id"
      }
    },

    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_due: {
      type: DataTypes.DATEONLY,
    },
    task_desc: {
      type: DataTypes.STRING,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName : "task",
    freezeTableName: true,
    sequelize,
  }
);

module.exports = Task;