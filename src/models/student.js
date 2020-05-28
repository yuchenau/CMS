// 导入 mongoose
const mongoose = require('mongoose');
// 导入 validator library Joi
const Joi = require('@hapi/joi')

const schema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minlength:2,
        trim:true
    },
    lastName: {
        type:String,
        required:[true, 'we need lastname']
    },
    email: {
        type:String,
        required:true,
        validate: {
            // validate 这个字段接收两个参数，第一个参数是一个函数 validator，第二个字段是一个错误的信息
            // 借用一些已经写好的 library，后端用的 joi.js, 前端用的 validator.js
            validator: (email) => !Joi.string().email().validate(email).error,
            msg: "Invalid email format"
        }
    },
    courses: [{
        // 一对一的关系
        type: String,
        ref: 'Student'
    }]
})

const Model = mongoose.model('Student', schema);
module.exports = Model;