const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const taskRoutes = require('./taskRoutes')
const emailRoutes = require('./emailRoutes')


router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes)
router.use('/emails', emailRoutes)

router.get('/sess', (req, res) => {
    res.json(req.session)
})

module.exports = router;