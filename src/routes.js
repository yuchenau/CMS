const express = require('express');

const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const authGuard = require('./middleware/authGuard');

const router = express.Router();

// 使用 middleware，用户携带了 token 才可以访问以下路径
router.use('/students', authGuard, studentRoutes);
router.use('/courses', courseRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;