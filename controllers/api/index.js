const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashRoutes = require('./dashRoutes');
const postRoutes = require('./postRoutes')

router.use('/users', userRoutes);
router.use('/dashboard', dashRoutes);
router.use('/post', postRoutes);

module.exports = router;
