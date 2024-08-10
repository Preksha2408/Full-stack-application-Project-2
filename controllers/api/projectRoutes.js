const router = require('express').Router();
const { Project, Task, User } = require('../../models');

//create new project
router.post('/', async (req, res) => {
    try {
      const newProject = await Project.create({ 
        ...req.body, 
        UserId });

      res.json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//get all Projects
router.get('/', (req, res) => {
  Project.findAll({
    include: [ 
      {model: Task}, 
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

//get project by id
router.get('/:id', (req, res) => {
  Project.findByPk(req.params.id, {
    include: [ 
      {model: Task}, 
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

//delete project by id
router.delete('/:id', (req, res) => {
  Project.destroy({
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