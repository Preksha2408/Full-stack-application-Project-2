const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');

class Task extends Model {}

Task.init(
  {
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_due: {
      type: DataTypes.DATEONLY,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
  }
);

module.exports = Task;