const express = require('express');

const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');

const router = express.Router();

router.use('/students', studentRoutes);
router.use('/courses', courseRoutes);

module.exports = router;