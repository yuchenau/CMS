// 导入 mongoose model
const courseModel = require('../models/course');

async function addCourse(req, res) {
    // // 这里只是一个存储在后端 server 的一个对象，没有存储在数据库中
    // const course = new courseModel({
    //     _id: 'abc91011',
    //     name: 'intro to web design'
    // });
    // // try, catch 错误处理 async, await 的错误
    // // 储存数据
    // await course.save();
    // return res.status(201).send(course);

    // 从 body 里面取出 name, code , description
    const { name, code, description } = req.body;
    // const course = new courseModel (name, code, description);
    const course = new courseModel ({name, code, description});
    await course.save();
    return res.status(201).send(course);
}

// 异步 async I/O
async function getCourse(req, res) {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    // 通过 id 取数据时候需要做一个检测，看数据是否有取到
    if (!course) {
        return res.status(404).send('course not found');
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

// PUT 
async function updateCourse(req, res) {
    const { id: code } = req.params;
    const { name, description } = req.body;
    // 这个函数返回的是查到的字段
    const newCouse = await courseModel.findByIdAndUpdate(code, { name, description }, { new: true });
    if (!newCouse) {
        return res.status(404).send('course not found');
    }
    return res.send(newCouse);
}

async function deleteCourse(req, res) {
    const { id: code } = req.params;
    // const { name, description } = req.body;
    const deletedCourse = courseModel.findByIdAndDelete(code);
    if (!deletedCourse) {
        return res.status(404).send('course not found');
    }
    return res.sendStatus(200);
}

module.exports = {
    addCourse,
    getCourse,
    getAllCourses,
    updateCourse,
    deleteCourse
}