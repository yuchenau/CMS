// 导入 mongoose
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    _id: {
        type:String,
        uppercase:true // 数据存储的自动转换
        
    },
    name: {
        type:String,
        required: true // 课程名为必须项
    },
    description: {
        type:String,
        default: 'This is default description.'
    }
})

// 将 schema 实例化成一个 model，第一个参数为它的名字，第二个参数是 schema
const Model = mongoose.model('Course', schema);
// 导出
module.exports = Model;