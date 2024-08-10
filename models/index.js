const User = require('./user');
const Project = require('./project');
const Task = require('./task');

Project.belongsTo(User, {
    onDelete: "CASCADE",
});

User.hasMany(Project);

User.hasMany(Task);


Task.belongsTo(User);

Task.belongsTo(Project);

Project.hasMany(Task);

module.exports = { User, Project, Task };