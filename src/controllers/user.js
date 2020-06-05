const userModel = require('../models/user');
const { generateToken,validateToken } = require('../utils/jwt');

// 这里的代码只展示用户的注册部分，用户信息的增删改查和 Student, Course 的 controller 代码逻辑相似
async function addUser(req, res){
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
        // 用户已经被注册
        return res.status(400).send('Username already exist');
    }
    const user = new userModel({
        username,
        password
    });
    await user.hashPassword();
    await user.save();
    // 用户注册成功之后生成 token
    const token = generateToken(user._id);
    return res.status(201).send({token, username});
}

module.exports = {
    addUser
};