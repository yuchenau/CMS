// 导入 mongoose
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minlength:2,
        trim:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    }
})

const Model = mongoose.model('Student', schema);
module.exports = Model;