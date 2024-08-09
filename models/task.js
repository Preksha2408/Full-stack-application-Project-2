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
      type: DataTypes.DATE,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'project',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // Match the table name used in the User model
        key: 'id',
      },
    },
    task_description: {
      type: DataTypes.STRING,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Task',
    tableName: 'task',
    freezeTableName: true,
  }
);

module.exports = Task;
