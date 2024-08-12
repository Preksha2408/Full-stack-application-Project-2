const router = require('express').Router();
const { Task, Project, User } = require('../../models');

router.get('/task/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [Project, User]
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.render('task', { task: task.get({ plain: true }) });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  console.log("Incoming Data: ", req.body)

  let taskData = {
    task_name: req.body.taskname,
    task_due: req.body.due_date,
    task_desc: req.body.taskdesc,
    is_completed: false
  }
  try {
    const newTask = await Task.create(taskData);
    console.log("DB data: ", newTask)
    res.status(200).json(newTask.dataValues);
  } catch (err) {
    res.status(500).json({err});
  }
});


//get all tasks
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

// //get task by id
// router.get('/:id', (req, res) => {
//   Task.findByPk(req.params.id, {
//     include: [ 
//       {model: Project}, 
//       {model: User} 
//     ]
//   })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "error", err});
//     });
// });

// router.delete('/:id', (req, res) => {
//   Task.destroy({
//     where: {
//       id: req.params.id,
//     }
//   })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "error", err });
//     });
// });


// //get task by id
// router.get('/:id', (req, res) => {
//   Task.findByPk(req.params.id, {
//     include: [ 
//       {model: Project}, 
//       {model: User} 
//     ]
//   })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "error", err});
//     });
// });

// router.delete('/:id', (req, res) => {
//   Task.destroy({
//     where: {
//       id: req.params.id,
//     }
//   })
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ msg: "error", err });
//     });
// });
module.exports = router;