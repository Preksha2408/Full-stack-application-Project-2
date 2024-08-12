const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Project, Task } = require('../models');
const withAuth = require('../utils/auth');
const {Op} = require('sequelize');
const dayjs = require('dayjs')

//Route for the root URL ('/') to display the login page
router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        const user = await User.findByPk(req.session.user_id)
        // If user is logged in, redirect to the homepage
        res.render('homepage', {
            username: user?.username || 'Guest', // Replace with dynamic data if needed
            project: null,
            loggedIn: req.session.logged_in,
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
    if (!req.session.logged_in) {
        res.redirect("/")
        return
    }
    // const currentDay = /*new Date()*/ dayjs().format('MM-DD-YYYY');
    // // console.log(currentDay)
    // const currentDayOfWeek = dayjs().day();
    // // console.log(`\n\n${currentDayOfWeek}`)
    // const startOfWeek = () => {
    //     if (currentDayOfWeek === 0) {
    //         const startOfWeek = currentDay;
    //         // console.log(`\n\n${startOfWeek}`)
    //         return startOfWeek
    //     }
    //     const startOfWeek = dayjs().subtract((currentDayOfWeek-1), 'day').format('MM-DD-YYYY')
    //     // console.log(`\n\n${startOfWeek}`)
    //     return startOfWeek
    // }
    // const startOfWeekDate = startOfWeek()
    // // console.log(`\n${startOfWeekDate} this is a Sunday`)
    // const endOfWeekDate = dayjs(startOfWeekDate).add(6, 'day').format('MM-DD-YYYY')

    // console.log(`\n${endOfWeek}`)

    // console.log("Incoming Query: ", req.query);
    // const weekOffset = Number(req.query.weekOffset) || 0;
    // const currentDay = new Date();
    // const currentDayOfWeek = currentDay.getDate();

    // console.log("Week: ", weekOffset);
    // console.log("Day: ", currentDay);
    // console.log("DayOf: ", currentDayOfWeek);
    
    // const startOfWeek = new Date(currentDay.setDate(currentDay.getDate()-currentDayOfWeek+7*weekOffset))
    // const endOfWeek = new Date(currentDay.setDate(currentDay.getDate()+6));

    // console.log("Today: ", currentDayOfWeek);
    // console.log("Start: ", startOfWeek);
    // console.log("End: ", endOfWeek);

    // console.log("Session OBj: ", req.session)
    // console.log("Params OBj: ", req.params)
 //   console.log("Current User: ", res.session.username)
 //   const [user, project] = await Promise.all([
    // const projectOriginal = await Promise.all([
    //     User.findByPk(req.session.user_id),
    //     Project.findByPk(req.params.id, {
    //         include: {
    //             model: Task,
    //             where: {
    //                 task_due: { [Op.between]: [ startOfWeek, endOfWeek ] }
    //             }
    //         },
    //         raw: true,
    //     })
    // ]);

    // const project = await Promise.all([
    //    /* Project.findByPk(req.params.projectId, {
    //         include: {
    //             model: Task,
    //             where: {
    //                 task_due: { [Op.between]: [ startOfWeek, endOfWeek ] }
    //             }
    //         },
    //         raw: true,
    //     }) */
    //     Project.findByPk(req.params.projectId)
    // ])
    // Our Request to the DB for the Current User --> The Associated Project --> The Associated User/Project Tasks
    // const user = await Promise.all([
    //     User.findByPk(req.session.user_id, {
    //         include: {
    //             model: Project,
    //         },
    //         raw: true,
    //     }),
    //     Project.findByPk(req.params.id)
    // ]);

    const [user, project] = await Promise.all([
        User.findByPk(req.session.user_id),
        Project.findByPk(req.params.id, {
            include: {
                model: Task,
                where: {
                    task_due: { [Op.between]: [ startOfWeekDate, endOfWeekDate ] }
                }
            },
            raw: true,
        })
    ])

    console.log("User data: ", user)
  //  console.log("Project data: ", project)
  //  console.log("Project Test: ", project)
    console.log("Project Test: ", project)

    res.render('homepage', {
        username: req.session.username || 'Guest',
        userId: req.session.user_id,                 // Replace with dynamic data if needed
        currentDayOfWeek,
        project: {
            projectname: project?.project_name || 'Your Project Name',
            due_date: project?.project_due || 'Due Date Here',
            tasks: {
                // "Sun": project?.tasks?.filter((task) => task.task_due.getDay() === 0) || [],
                // "Mon": project?.tasks?.filter((task) => task.task_due.getDay() === 1) || [],
                // "Tue": project?.tasks?.filter((task) => task.task_due.getDay() === 2) || [],
                // "Wed": project?.tasks?.filter((task) => task.task_due.getDay() === 3) || [],
                // "Thu": project?.tasks?.filter((task) => task.task_due.getDay() === 4) || [],
                // "Fri": project?.tasks?.filter((task) => task.task_due.getDay() === 5) || [],
                // "Sat": project?.tasks?.filter((task) => task.task_due.getDay() === 6) || [],
            },

            loggedIn:req.session.logged_in
        }

    });
});

module.exports = router;