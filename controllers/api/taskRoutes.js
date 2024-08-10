const router = require('express').Router();
const { Task } = require('../../models');

//--------------------------------------------------------Jo's code ------------//
router.post('/', async (req, res) => {
  try {
    const newTask = await Task.create({ ...req.body });

    res.status(200).json(newTask);
  } catch (err) {
    res.status(500).json(err);
  }
});


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

  router.get('/', (req, res) => {
    Task.findAll({
      include: [
        {model: Project},
        {model: User}
      ]
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "error", err});
      });
  });
//get task by id
router.get('/:id', (req, res) => {
  Task.findByPk(req.params.id, {
    include: [ 
      {model: Project}, 
      {model: User} 
    ]
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error", err});
    });
});

router.delete('/:id', (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "error", err });
    });
});
module.exports = router;