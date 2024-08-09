const router = require('express').Router();
const { User, Project, Task } = require('../models');
const withAuth = require('../utils/auth');

router.get('/homepage', (req, res) => {
  const { projectname, due_date } = req.query;
  res.render('homepage', {
    username: 'Guest', // Replace with dynamic data if needed
    projectname: projectname || 'Your Project Name',
    due_date: due_date || 'Due Date Here'
  });
});

//Uncomment this after done working with homepage route 
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
res.render('login');
});

//Route for the root URL ('/') to display the login page
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    // If user is logged in, redirect to the homepage
    res.redirect('/homepage');
  } else {
    // If user is not logged in, render the login page
    res.render('login');
  }
});

module.exports = router;