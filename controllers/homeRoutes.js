const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Project, Task } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');
const dayjs = require('dayjs')

//Route for the root URL ('/') to display the login page
router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        const user = await User.findByPk(req.session.user_id)
        const projectData = await Project.findAll()
        const projects = projectData.map((project) => project.get({ plain: true }));
        console.log(`\n\n\n${user.username}\n\n\n`)
        // If user is logged in, redirect to the homepage
        res.render('homepage', {
            username: user?.username || 'Guest', // Replace with dynamic data if needed
            project: projects,
            loggedIn: req.session.logged_in,
            userId: req.session.user_id,
        });
    } else {
        // If user is not logged in, render the login page
        res.render('login');
    }
});

// router.get('/', async (req, res) => {
//     if (req.session.logged_in) {
//         const user = await User.findByPk(req.session.user_id, {
//             include: [Project]
//         });
//         res.render('homepage', {
//             username: user?.username || 'Guest',
//             projects: user?.projects || [],
//             project: null,
//             loggedIn: req.session.logged_in,
//         });
//     } else {
//         res.render('login');
//     }
// });

router.get('/projects/:id', async (req, res) => {
    try {

        if (!req.session.logged_in) {
            res.redirect("/")
            return
        }

        const currentDay = /*new Date()*/ dayjs().format('MM-DD-YYYY');
        // console.log(currentDay)
        const currentDayOfWeek = dayjs().day();
        // console.log(`\n\n${currentDayOfWeek}`)
        const startOfWeek = () => {
            if (currentDayOfWeek === 0) {
                const startOfWeek = currentDay;
                // console.log(`\n\n${startOfWeek}`)
                return startOfWeek
            }
            const startOfWeek = dayjs().subtract((currentDayOfWeek - 1), 'day').format('MM-DD-YYYY')
            // console.log(`\n\n${startOfWeek}`)
            return startOfWeek
        }
        const startOfWeekDate = startOfWeek()
        // console.log(`\n${startOfWeekDate} this is a Sunday`)
        const endOfWeekDate = dayjs(startOfWeekDate).add(6, 'day').format('MM-DD-YYYY')
        // console.log(`\n${endOfWeek}`)

        // const [user, projectData] = await Promise.all([
        //     User.findByPk(req.session.user_id),
        //     Project.findByPk(req.params.id, {
        //         include: {
        //             model: Task,
        //             where: {
        //                 task_due: { [Op.between]: [ startOfWeekDate, endOfWeekDate ] }
        //             }
        //         },
        //         raw: true,
        //     })
        // ])
        console.log(req.params.id);
        const projectData = await Project.findByPk(req.params.id, {

            include: {
                model: Task,
                // where: {
                //     task_due: { [Op.between]: [ startOfWeekDate, endOfWeekDate ] }
                // }
            },
            // raw: true,
        })
        // const projectData = await Project.findByPk(req.params.id);
        console.log("Project :", projectData);
        console.log("Test 123");
        const project = projectData.get({ plain: true });

        let taskObj = {
            "Sun": project?.tasks?.filter((task) => { 
                let day = dayjs(task.task_due).day()
                return day === 0 }) || [],
            "Mon": project?.tasks?.filter((task) => { 
                let day = dayjs(task.task_due).day()
                return day === 1 }) || [],
            "Tue": project?.tasks?.filter((task) => {
                let day = dayjs(task.task_due).day()
                 return day === 2 }) || [],
            "Wed": project?.tasks?.filter((task) => { 
                let day = dayjs(task.task_due).day()
                return day === 3 }) || [],
            "Thu": project?.tasks?.filter((task) => { 
                let day = dayjs(task.task_due).day()
                return day === 4 }) || [],
            "Fri": project?.tasks?.filter((task) => { 
                let day = dayjs(task.task_due).day()
                return day === 5 }) || [],
            "Sat": project?.tasks?.filter((task) => { 
                let day = dayjs(task.task_due).day()
                return day === 6 }) || [],
        }
            // const dueTasks = project.map((obj) => ({...obj.Task.dataValues}))

            res.render('homepage', {
                username: req.session.username || 'Guest', // Replace with dynamic data if needed
                userId: req.session.user_id,
                currentDayOfWeek,
                project: {
                    projectname: project?.project_name || 'Your Project Name',
                    due_date: project?.project_due || 'Due Date Here',
                    tasks: taskObj,

                    loggedIn: req.session.logged_in,
                },

            });
    }
    catch (err) {
        console.log(err)
    }
});

// router.get("/", (req, res) => {
//     Project.findAll()
//     .then((projData) => {
//         const hbsProj = projData.map((proj) => proj.toJSON());
//         res.render('homepage', {
//             projects: hbsProj,
//             userId: req.session.user_id,
//             // loggedIn: req.session.logged_in,
//         })
//     })
// }); 

module.exports = router;