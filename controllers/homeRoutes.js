const router = require('express').Router();
const { User, Project, Task } = require('../models');
const withAuth = require('../utils/auth');




//Route for the root URL ('/') to display the login page
router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        const user = await User.findByPk(req.session.user_id)
        // If user is logged in, redirect to the homepage
        res.render('homepage', {
            username: user?.username || 'Guest', // Replace with dynamic data if needed
            projectname: 'Your Project Name',
            due_date: 'Due Date Here'
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
    const [user, project] = await Promise.all([User.findByPk(req.session.user_id), Project.findByPk(req.params.projectId)])
    // If user is logged in, redirect to the homepage
    res.render('homepage', {
        username: user?.username || 'Guest', // Replace with dynamic data if needed
        projectname: project?.project_name || 'Your Project Name',
        due_date: project?.project_due || 'Due Date Here'
    });
});

module.exports = router;