const router = require('express').Router();
const { User, Project, Task } = require('../../models');
const withAuth = require('../../utils/auth');


// Route to handle form submission

// app.post('/task', (req, res) => {
//     const { taskName, taskDueDate, taskDescription, projectName } = req.body;
//     res.render('task', {
//       taskName,
//       taskDueDate,
//       taskDescription,
//       projectName
//     });
//   });


module.exports = router;