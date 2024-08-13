const sequelize = require("../config/connection");
const { User, Project, Task } = require("../models");
const userData = [
    {
        username: "Joey",
        email: "o7018042@gmail.com",
        password: "password",
    },
    {
        username: "Elizabeth",
        email: "o7018042@gmail.com",
        password: "password",
    },
];
const projectData = [
    {
        project_name: 'Guest bathroom',
        project_due: '09-30-2024',
        UserId: 1,
    },
    {
        project_name: 'New shed',
        project_due: '12-31-2024',
        UserId: 2,
    },
];
const taskData = [
    {
        task_name: "Remove sink and toilet",
        task_due: '08-13-2024',
        UserId: 1,
        ProjectId: 1,
    },
    {
        task_name: "Rip up tile",
        task_due: '08-13-2024',
        UserId: 1,
        ProjectId: 1,
    },
    {
        task_name: "Lay new tile",
        task_due: '08-15-2024',
        UserId: 1,
        ProjectId: 1,
    },
    {
        task_name: "Meet with carpenter",
        task_due: '08-13-2024',
        UserId: 2,
        ProjectId: 2,
    },
    {
        task_name: "Buy lumber",
        task_due: '08-15-2024',
        UserId: 2,
        ProjectId: 2,
    },
];
const seedMe = async () => {
    try {
        await sequelize.sync({ force: true });
        await User.bulkCreate(userData, {
            individualHooks: true,
        });
        await Project.bulkCreate(projectData);
        console.log("+++++++++++++++\n\nyay\n\n++++++++++++++++");
        await Task.bulkCreate(taskData);
        console.log("+++++++++++++++\n\nfinally\n\n++++++++++++++++");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
seedMe();