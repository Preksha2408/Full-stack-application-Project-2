const router = require('express').Router();
const Project = require('../../models/project');


router.post('/', async (req, res) => {
    try {
      const { project_name, due_date } = req.body;
  
      //  save the project to the database here, 
      const newProject = await Project.create({ project_name, project_due: due_date });
  
      // Send a response back to the client
      res.json({ success: true,data: newProject });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to create project' });
    }
  });

module.exports = router;