// 导入 mongoose model
const studentModel = require('../models/student');

async function addStudent(req, res) {
    const { firstName, lastName, email } = req.body;
    const student = new studentModel({ firstName, lastName, email });
    await student.save();
    return res.status(201).send(student);
}

async function getStudent(req, res) {
    const { id } = req.params;
    const student = await studentModel.findById(id);
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

function deleteStudent(req, res) {
    const { id } = req.params;
    const deletedStudent = studentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
        return res.status(404).send('student not found');
    }
    return res.sendStatus(200);
}

module.exports = {
    addStudent,
    getStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
}