const sequelize = require("../config/connection");
const { User, Project, Task } = require("../models");

const userData = [
    {
        username: "Joey",
        email: "jpmankovich@gmail.com",
        password: "password",
    },
    {
        username: "Elizabeth",
        email: "egodschalk@gmail.com",
        password: "password",
    },
];

const projectData = [
    {
        project_name: 'Project 1',
        project_due: 'Aug 30, 2024',
        UserId: 1,
    },
    {
        project_name: 'Project 2',
        project_due: 'Dec 31, 2024',
        UserId: 2,
    },
];

const taskData = [
    {
        task_name: "12345",
        task_due: '2024-08-07',
        UserId: 1,
        projectId: 1,
    },
    {
        task_name: "67890",
        task_due: '2024-08-09',
        UserId: 1,
        projectId: 1,
    },
    {
        task_name: "13579",
        task_due: '2024-08-07',
        user_id: 1,
        projectId: 1,
    },
    {
        task_name: "24680",
        task_due: '2024-08-09',
        UserId: 2,
        projectId: 2,
    },
];

const seedMe = async () => {
    try {
        await sequelize.sync({ force: true });
        await User.bulkCreate(userData, {
            individualHooks: true,
        });
        await Task.bulkCreate(taskData);
        console.log("yay");
        await Project.bulkCreate(projectData);
        console.log("finally");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
seedMe();