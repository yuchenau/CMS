const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username:{
        // 可以将 user name 设为 id 
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})

const Model = mongoose.model('User', schema);
module.exports = Model;