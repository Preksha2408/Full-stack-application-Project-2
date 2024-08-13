const User = require('./user');
const Project = require('./project');
const Task = require('./task');

Project.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

User.hasMany(Project,{
    foreignKey: "user_id"
});

User.hasMany(Task, {
    foreignKey: "user_id"
});

Task.belongsTo(User, {
    foreignKey: "user_id"
});

Task.belongsTo(Project, {
    foreignKey: "project_id"
});

Project.hasMany(Task, {
    foreignKey: "project_id"
});

module.exports = { User, Project, Task };