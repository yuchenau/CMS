// 导入 mongoose model
const studentModel = require('../models/student');
const courseModel = require('../models/course');

// 错误处理
// function tryCatch(req, res, next, func) {
//     try { ..
//     } catch { ..
//     }
// }

async function addStudent(req, res, next) {
    const { firstName, lastName, email } = req.body;
    const student = new studentModel({ firstName, lastName, email });
    // try {
    //     await student.save();
    // } catch(e) {
    //     // 在不同的环境下返回不同的数据
    //     return res.status(400).send(e.message);
    // }
    await student.save();
    return res.status(201).send(student);
}

async function getStudent(req, res) {
    const { id } = req.params;
    const student = await studentModel.findById(id).populate('courses');
    if (!student) {
        return res.status(404).send('student not found');
    }
    return res.send(student);
}

async function getAllStudents(req, res) {
    const students = await studentModel.find().exec();
    res.send(students);
}

function updateStudent(req, res) {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const newStudent = studentModel.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true });
    return  res.send(newStudent);
}

async function deleteStudent(req, res) {
    const { id } = req.params;
    const deletedStudent = studentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
        return res.status(404).send('student not found');
    }
    // 处理学生被删除之后，在课程 model 中依然存在 embed 关系的错误
    await courseModel.updateMany(
        { _id: {$in: student.courses} }, 
        { $pull: { students: student} }
    );
    return res.sendStatus(200);
}

async function addCourse(req, res) {
    // console.log('activated');
    // get student id, course code from url
    const { id, code } = req.params;
    // find course
    const course = await courseModel.findById(code);
    // find student
    const student = await studentModel.findById(id);
    // check student and course exist
    if (!student || !course) {
        return res.status(404).send('student or course not found');
    }
    // add course to student
    student.courses.addToSet(course._id);
    // add course to course.student
    course.students.addToSet(student._id);
    // save student, course
    Promise.all([await student.save(), await course.save()]);
    await student.save();
    await course.save();
    // return student
    return res.send(student);
}

async function deleteCourse(req, res) {
    const { id, code } = req.params;
    const course = await courseModel.findById(code);
    const student = await studentModel.findById(id);
    if (!student || !course)  {
        return res.status(404).send('student or course not found');
    }
    // delete course from student's courses
    const oldCount = student.courses.length;
    student.courses.pull(course._id);
    if(student.courses.length === oldCount) {
        return res.status(404).send('enrolment does not exist');
    }
    // delete student from course's students
    course.students.pull(student._id);
    // save & return
    await course.save();
    await student.save();
    return res.send(student);
}

module.exports = {
    addStudent,
    getStudent,
    getAllStudents,
    updateStudent,
    deleteStudent,
    addCourse,
    deleteCourse
}