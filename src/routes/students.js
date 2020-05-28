const express = require('express');
const {
    addStudent,
    getStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    addCourse,
    deleteCourse
} = require('../controllers/students');

const router = express.Router();

router.get('/', getAllStudents);
router.get('/:id', getStudent);
router.post('/', addStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

// 学生添加一门课程 api/students/:id/courses/:code
router.post('/:id/courses/:code', addCourse);
router.delete('/:id/courses/:code', deleteCourse);

module.exports = router;