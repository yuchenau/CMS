const userModel = require('../models/user');
const {generateToken} = require('../utils/jwt');

async function loginUser(req, res){
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ username });
    if (!existingUser) {
        return res.status(400).send('Invalid username or password');
    }
    const validPassword = await existingUser.validatePassword(password);
    if (!validPassword) {
        // 等号反转，错误的情况下直接做返回
        return res.status(400).send('Invalid username or password');
    }
    const token = generateToken(existingUser._id);
    return res.status(201).send({ token, username });
}

module.exports = {
    loginUser
};