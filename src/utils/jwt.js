const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_KEY;

// 只想把 id 传入到 token 中可以只在函数中传入 id
function generateToken(id) {
    const token = jwt.sign({id}, process.env.JWT_KEY, {expiresIn: '6h'})
    return token;
}

function validateToken(token) {
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (e) {
        // return object, {}, null, undefined
        return null;
    }
    return decoded;
}

module.exports = {
    generateToken,
    validateToken
}