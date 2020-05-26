// 导入 mongoose model
const courseModel = require('../models/course');

async function addCourse(req, res) {
    // 只是一个存储在后端 server 的一个对象，并没有存储在数据库中
    const course = new courseModel({
        _id: 'abc678',
        name: 'intro to web design'
    });
    // try, catch 错误处理 async, await 的错误
    // 储存数据
    await course.save();
    // 在这里写 return 的目的是
    return res.status(201).send(course);
}

// 异步 async I/O
async function getCourse(req, res) {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    // 通过 id 取数据时候需要做一个检测，看数据是否有取到
    if (!course) {
        return res.status(404).send('course not found')
    }
    return res.send(course);
}

async function getAllCourses(req, res) {
    // mongoose shell 中 db.courses.find()
    // 可以把 model 理解成 collection
    // .exec 函数（立即执行）
    const courses = await courseModel.find().exec();
    res.send(courses);
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