const router = require('express').Router();
const Project = require('../../models/project');


router.post('/api/projects', async (req, res) => {
    try {
      const { projectname, due_date } = req.body;
  
      //  save the project to the database here, 
      //const newProject = await Project.create({ projectname, due_date });
  
      // Send a response back to the client
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Failed to create project' });
    }
  });

module.exports = router;