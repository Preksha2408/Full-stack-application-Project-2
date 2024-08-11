const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Project, Task } = require('../models');
const withAuth = require('../utils/auth');
const {Op} = require('sequelize');


//Route for the root URL ('/') to display the login page
router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        const user = await User.findByPk(req.session.user_id)
        // If user is logged in, redirect to the homepage
        res.render('homepage', {
            username: user?.username || 'Guest', // Replace with dynamic data if needed
            project: null,
        });
    } else {
        // If user is not logged in, render the login page
        res.render('login');
    }
});


router.get('/projects/:projectId', async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect("/")
        return
    }
    
    const weekOffset = Number(req.query.weekOffset) || 0;
    const currentDay = new Date();
    const currentDayOfWeek = currentDay.getDate();
    
    const startOfWeek = new Date(currentDay.setDate(currentDay.getDate()-currentDayOfWeek+7*weekOffset))
    const endOfWeek = new Date(currentDay.setDate(currentDay.getDate()+6));

    const [user, project] = await Promise.all([
        User.findByPk(req.session.user_id),
        Project.findByPk(req.params.projectId, {
            include: {
                model: Task,
                where: {
                    task_due: { [Op.between]: [ startOfWeek, endOfWeek ] }
                }
            },
            raw: true,
        })
    ])
    res.render('homepage', {
        username: user?.username || 'Guest', // Replace with dynamic data if needed
        currentDayOfWeek,
        project: {
            project_name: project?.project_name || 'Your Project Name',
            due_date: project?.project_due || 'Due Date Here',
            tasks: {
                "Sun": project?.tasks.filter((task) => task.task_due.getDate() === 0) || [],
                "Mon": project?.tasks.filter((task) => task.task_due.getDate() === 1) || [],
                "Tue": project?.tasks.filter((task) => task.task_due.getDate() === 2) || [],
                "Wed": project?.tasks.filter((task) => task.task_due.getDate() === 3) || [],
                "Thu": project?.tasks.filter((task) => task.task_due.getDate() === 4) || [],
                "Fri": project?.tasks.filter((task) => task.task_due.getDate() === 5) || [],
                "Sat": project?.tasks.filter((task) => task.task_due.getDate() === 6) || [],
            },
        }

    });
});

module.exports = router;