const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
// const emailRoutes = require('./emailRoutes')
const taskRoutes = require('./taskRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
// router.use('/emails', emailRoutes)
router.use('/tasks', taskRoutes)

module.exports = router;