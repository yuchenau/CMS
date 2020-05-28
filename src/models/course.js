// 导入 mongoose
const mongoose = require('mongoose');

// mongoose 接收的第一个参数可能是这个表长成什么样子 object
// 第二个参数可以是一些参数上的配置
const schema = new mongoose.Schema({
    _id: {
        type:String,
        uppercase:true, // 数据存储的自动转换
        alias:'code', // alias 的含义是
    },
    name: {
        type:String,
        required: true
    },
    description: {
        type:String,
        default: 'This is default description.'
    },
    // 修改了 schema 之后原有的数据是不会发生变化的
    // text: {
    //     type:Boolean,
    //     default:true
    // }
    // 和 student collection 的关联
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',}
    ],
    __v: {
        type:Number,
        select:false
    }
}, {
    // 更改默认情况，JSON 中需要这一字段
    toJSON: {
        virtuals: true,
    },
    // timestamps:true,
    id:false
});

// 在 schema 上新定义了一个 virtual 属性
// schema.virtual('code').get(function() {
//     return this._id;
// });

// 将 schema 实例化成一个 model，第一个参数为它的名字，第二个参数是 schema
const Model = mongoose.model('Course', schema);
// 导出
module.exports = Model;