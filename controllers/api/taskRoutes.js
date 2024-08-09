const router = require('express').Router();
const { Task } = require('../../models');

router.post('/api/tasks', async (req, res) => {
    try {
      const { taskname, due_date } = req.body;
  
      // Save the task to the database
      const newTask = await Task.create({ taskname, due_date });
  
      // Respond with the new task details
      res.json({ success: true, task: newTask });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to create task' });
    }
  });

module.exports = router;