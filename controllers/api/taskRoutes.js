const router = require('express').Router();
const { Task, Project, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const newTask = await Task.create({ ...req.body });
  
      res.status(200).json(newTask);
    } catch (err) {
      res.status(500).json(err);
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