// 导入 mongoose model
const courseModel = require('../models/course');

async function addCourse(req, res) {
    // 只是一个存储在后端 server 的一个对象，并没有存储在数据库中
    const course = new courseModel({
        _id: 'abc123',
        name: 'intro to web design'
    });
    // 错误处理机制
    // 储存数据
    await course.save();
    res.send(course);
}

function getCourse(req, res) {
    
}

function getAllCourses(req, res) {
    res.json([{}, {}]);
}

function updateCourse(req, res) {

}

function deleteCourse(req, res) {

}

module.exports = {
    addCourse,
    getCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
}